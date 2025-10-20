import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileText, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DocumentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  documents: string[];
}

const DocumentsModal = ({ isOpen, onClose, serviceName, documents }: DocumentsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Documents Required for {serviceName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Please ensure you have the following documents ready before applying:
          </p>

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

          <div className="bg-primary/5 rounded-lg p-4 border-l-4 border-primary">
            <p className="text-sm text-muted-foreground">
              💡 <strong>Tip:</strong> Keep photocopies and original documents ready. 
              Visit the Panchayat office during working hours for submission.
            </p>
          </div>

          <Button className="w-full" onClick={onClose}>
            Got it, Thanks!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentsModal;
