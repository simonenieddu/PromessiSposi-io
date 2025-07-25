import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

interface TooltipModalProps {
  isOpen: boolean;
  onClose: () => void;
  term: string;
}

export default function TooltipModal({ isOpen, onClose, term }: TooltipModalProps) {
  const { data: glossaryTerm, isLoading } = useQuery({
    queryKey: [`/api/glossary/${encodeURIComponent(term)}`],
    enabled: isOpen && !!term,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-playfair text-literary-blue">
            {term}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-literary-blue mx-auto"></div>
            </div>
          ) : glossaryTerm ? (
            <>
              <div className="text-gray-700 leading-relaxed">
                {glossaryTerm.definition}
              </div>
              {glossaryTerm.context && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <strong className="text-sm text-gray-600">Contesto:</strong>
                  <p className="text-sm text-gray-700 mt-1">{glossaryTerm.context}</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-gray-600">
              Definizione non disponibile per questo termine.
            </div>
          )}
        </div>

        <div className="flex justify-between pt-4 border-t">
          <Button variant="ghost" className="text-literary-blue">
            <i className="fas fa-bookmark mr-2"></i>
            Salva nel glossario
          </Button>
          <Button onClick={onClose} className="bg-literary-blue hover:bg-literary-blue/90">
            Chiudi
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
