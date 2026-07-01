import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus, Trash2, GripVertical, MapPin, Clock } from 'lucide-react';

const TYPE_STYLES = {
  Accommodation: 'bg-amber-50 border-amber-200 text-amber-700',
  Transfer: 'bg-blue-50 border-blue-200 text-blue-700',
  Activity: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  Restaurant: 'bg-rose-50 border-rose-200 text-rose-700',
  Guide: 'bg-purple-50 border-purple-200 text-purple-700',
  'Car Rental': 'bg-slate-50 border-slate-200 text-slate-700',
  'Boat Trip': 'bg-cyan-50 border-cyan-200 text-cyan-700',
  Experience: 'bg-violet-50 border-violet-200 text-violet-700',
  Other: 'bg-gray-50 border-gray-200 text-gray-700',
};
const styleFor = (t) => TYPE_STYLES[t] || TYPE_STYLES.Other;

export default function ItineraryBoard({ items, suppliers, onAddItem, onEditItem, onDeleteItem, onReorder }) {
  const [extraDays, setExtraDays] = useState([]);

  const itemDays = [...new Set(items.map(i => i.day_number || 1))].sort((a, b) => a - b);
  const days = Array.from(new Set([...itemDays, ...extraDays])).sort((a, b) => a - b);
  if (days.length === 0) days.push(1);

  const itemsForDay = (day) => items.filter(i => (i.day_number || 1) === day).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

  const addDay = () => {
    const next = Math.max(1, ...items.map(i => i.day_number || 1), ...extraDays) + 1;
    setExtraDays(prev => [...prev, next]);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const srcDay = Number(result.source.droppableId.replace('day-', ''));
    const dstDay = Number(result.destination.droppableId.replace('day-', ''));
    if (result.source.droppableId === result.destination.droppableId && result.source.index === result.destination.index) return;

    const sorted = (day) => items.filter(i => (i.day_number || 1) === day).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

    if (srcDay === dstDay) {
      const list = sorted(srcDay).map(i => ({ ...i }));
      const [moved] = list.splice(result.source.index, 1);
      list.splice(result.destination.index, 0, moved);
      list.forEach((it, idx) => { it.day_number = srcDay; it.sort_order = idx; });
      const changed = new Map(list.map(i => [i.id, i]));
      return onReorder(items.map(i => (changed.has(i.id) ? changed.get(i.id) : i)));
    }

    const srcList = sorted(srcDay).map(i => ({ ...i }));
    const [moved] = srcList.splice(result.source.index, 1);
    moved.day_number = dstDay;
    const dstList = sorted(dstDay).filter(i => i.id !== moved.id).map(i => ({ ...i }));
    dstList.splice(result.destination.index, 0, moved);
    srcList.forEach((it, idx) => { it.day_number = srcDay; it.sort_order = idx; });
    dstList.forEach((it, idx) => { it.day_number = dstDay; it.sort_order = idx; });
    const changed = new Map([...srcList, ...dstList].map(i => [i.id, i]));
    onReorder(items.map(i => (changed.has(i.id) ? changed.get(i.id) : i)));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-3 overflow-x-auto pb-3 -mx-1 px-1">
        {days.map(day => {
          const dayItems = itemsForDay(day);
          const dayTotal = dayItems.reduce((s, i) => s + (Number(i.customer_price) || 0), 0);
          return (
            <Droppable key={day} droppableId={`day-${day}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`flex-shrink-0 w-64 rounded-2xl border p-2.5 transition-colors ${snapshot.isDraggingOver ? 'border-primary bg-primary/5' : 'border-border bg-muted/30'}`}
                >
                  <div className="flex items-center justify-between px-1 mb-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-primary">Day {day}</h3>
                    <span className="text-[11px] text-muted-foreground">{dayItems.length} · €{dayTotal.toFixed(0)}</span>
                  </div>

                  <div className="space-y-2 min-h-[40px]">
                    {dayItems.map((item, idx) => {
                      const supplier = suppliers.find(s => s.id === item.supplier_id);
                      return (
                        <Draggable key={item.id} draggableId={item.id} index={idx}>
                          {(prov, snap) => (
                            <div
                              ref={prov.innerRef}
                              {...prov.draggableProps}
                              className={`rounded-xl border bg-card p-2.5 shadow-sm ${snap.isDragging ? 'shadow-lg ring-2 ring-primary/40' : ''}`}
                            >
                              <div className="flex items-start gap-1.5">
                                <span {...prov.dragHandleProps} className="mt-0.5 text-muted-foreground/60 hover:text-foreground cursor-grab active:cursor-grabbing">
                                  <GripVertical size={14} />
                                </span>
                                <div className="flex-1 min-w-0">
                                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-medium ${styleFor(item.item_type)}`}>{item.item_type}</span>
                                  <h4 className="font-semibold text-sm mt-1 leading-tight">{item.title}</h4>
                                  {item.description && <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{item.description}</p>}
                                  <div className="flex flex-wrap gap-2 mt-1 text-[11px] text-muted-foreground">
                                    {item.start_time && <span className="flex items-center gap-0.5"><Clock size={10} />{item.start_time}</span>}
                                    {item.location && <span className="flex items-center gap-0.5"><MapPin size={10} />{item.location}</span>}
                                  </div>
                                  {supplier && <p className="text-[11px] text-muted-foreground mt-0.5">🏷 {supplier.supplier_name}</p>}
                                  <div className="flex items-center justify-between mt-1.5">
                                    <div>
                                      <span className="text-[10px] text-muted-foreground">cost €{(Number(item.internal_cost) || 0).toFixed(0)}</span>
                                      <span className="ml-2 text-sm font-bold">€{(Number(item.customer_price) || 0).toFixed(0)}</span>
                                    </div>
                                    <div className="flex gap-0.5">
                                      <button onClick={() => onEditItem(item)} className="p-1 rounded hover:bg-muted text-xs text-muted-foreground">Edit</button>
                                      <button onClick={() => onDeleteItem(item)} className="p-1 rounded hover:bg-destructive/10 text-destructive"><Trash2 size={12} /></button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>

                  <button
                    onClick={() => onAddItem(day)}
                    className="w-full mt-2 flex items-center justify-center gap-1 py-1.5 rounded-lg border border-dashed border-border text-xs text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
                  >
                    <Plus size={12} /> Add to Day {day}
                  </button>
                </div>
              )}
            </Droppable>
          );
        })}

        <button
          onClick={addDay}
          className="flex-shrink-0 w-12 flex items-center justify-center rounded-2xl border border-dashed border-border text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
          title="Add a day"
        >
          <Plus size={20} />
        </button>
      </div>
    </DragDropContext>
  );
}