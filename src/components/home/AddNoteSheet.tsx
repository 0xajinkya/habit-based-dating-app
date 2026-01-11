import React, { useState } from 'react';
import { BottomSheet } from '../../design-system/components/BottomSheet';
import { Button } from '../../design-system/components/Button';
interface AddNoteSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: string) => void;
}
export function AddNoteSheet({
  isOpen,
  onClose,
  onSave
}: AddNoteSheetProps) {
  const [note, setNote] = useState('');
  const handleSave = () => {
    if (note.trim()) {
      onSave(note);
      setNote('');
      onClose();
    }
  };
  return <BottomSheet isOpen={isOpen} onClose={onClose} title="Add Note">
      <div className="space-y-4">
        <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="How did it go today?" maxLength={200} className="w-full h-32 p-3 rounded-lg border border-gray-200 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500" autoFocus />
        <div className="flex justify-end text-xs text-gray-400">
          {note.length}/200
        </div>

        <div className="flex gap-3">
          <Button variant="secondary" fullWidth onClick={onClose}>
            Cancel
          </Button>
          <Button fullWidth onClick={handleSave} disabled={!note.trim()}>
            Save Note
          </Button>
        </div>
      </div>
    </BottomSheet>;
}