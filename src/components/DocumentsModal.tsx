import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileText, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DocumentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  description?: string;
  documents: string[];
  tips?: string[];
  buttonText?: string;
}

const DocumentsModal = ({ 
  isOpen, 
  onClose, 
  serviceName, 
  description,
  documents, 
  tips,
  buttonText = "Got it, Thanks!"
}: DocumentsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            {serviceName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {description && (
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          )}

          <div>
            <h4 className="font-semibold mb-3 text-sm">Required Documents:</h4>
            <div className="space-y-3">
              {documents.map((doc, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {tips && tips.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Tips:</h4>
              {tips.map((tip, index) => (
                <div key={index} className="bg-primary/5 rounded-lg p-4 border-l-4 border-primary">
                  <p className="text-sm text-muted-foreground">
                    💡 {tip}
                  </p>
                </div>
              ))}
            </div>
          )}

          <Button className="w-full" onClick={onClose}>
            {buttonText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentsModal;

