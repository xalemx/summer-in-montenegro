import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const ALLOWED_PROFILE = ['supplier_name', 'contact_name', 'phone', 'whatsapp', 'website', 'description', 'services', 'location'];

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await req.json().catch(() => ({}));
    const action = body.action;

    const sups = await base44.asServiceRole.entities.Supplier.filter({ email: user.email }, '-created_date', 50);
    const supplier = sups && sups[0];
    if (!supplier) return Response.json({ error: 'No supplier profile is linked to your account. Please ask the coordinator to invite you using your supplier email.' }, { status: 403 });

    if (action === 'me') {
      const quotes = await base44.asServiceRole.entities.SupplierQuote.filter({ supplier_id: supplier.id }, '-created_date', 100);
      return Response.json({ supplier, quotes });
    }

    if (action === 'update_profile') {
      const upd = {};
      for (const k of ALLOWED_PROFILE) if (k in (body.fields || {})) upd[k] = body.fields[k];
      const updated = await base44.asServiceRole.entities.Supplier.update(supplier.id, upd);
      return Response.json({ supplier: updated });
    }

    if (action === 'upload_photo') {
      const photos = [...(supplier.photos || []), body.photo_url];
      const updated = await base44.asServiceRole.entities.Supplier.update(supplier.id, { photos });
      return Response.json({ supplier: updated });
    }

    if (action === 'remove_photo') {
      const photos = (supplier.photos || []).filter((_, i) => i !== body.index);
      const updated = await base44.asServiceRole.entities.Supplier.update(supplier.id, { photos });
      return Response.json({ supplier: updated });
    }

    if (action === 'update_availability') {
      const updated = await base44.asServiceRole.entities.Supplier.update(supplier.id, {
        availability_status: body.availability_status || 'available',
        availability_notes: body.availability_notes || '',
      });
      return Response.json({ supplier: updated });
    }

    if (action === 'respond_quote') {
      const q = await base44.asServiceRole.entities.SupplierQuote.get(body.quote_id);
      if (!q || q.supplier_id !== supplier.id) return Response.json({ error: 'Quote not found' }, { status: 404 });
      const updated = await base44.asServiceRole.entities.SupplierQuote.update(body.quote_id, {
        status: body.status || 'quoted',
        supplier_price: Number(body.supplier_price) || 0,
        supplier_notes: body.supplier_notes || '',
        responded_date: new Date().toISOString(),
      });
      return Response.json({ quote: updated });
    }

    return Response.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('supplierPortal error', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});