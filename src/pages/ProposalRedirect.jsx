import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';

export default function ProposalRedirect() {
  const { id } = useParams();
  const nav = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const p = await base44.entities.Proposal.get(id);
        if (p && p.travel_project_id) {
          const proj = await base44.entities.TravelProject.get(p.travel_project_id);
          if (proj && proj.reference_number) { nav(`/trip/${proj.reference_number}`, { replace: true }); return; }
        }
      } catch (e) { /* ignore */ }
      nav('/', { replace: true });
    })();
  }, [id]);
  return <div className="py-24 text-center text-muted-foreground">Redirecting to your trip…</div>;
}