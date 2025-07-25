import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface HistoricalContextProps {
  context?: string;
}

export default function HistoricalContext({ context }: HistoricalContextProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-playfair text-literary-blue">
          Contesto Storico
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
            <h4 className="font-semibold text-amber-800 mb-2">XVII Secolo</h4>
            <p className="text-sm text-amber-700">
              L'azione si svolge in Lombardia tra il 1628 e il 1630, durante la dominazione spagnola.
            </p>
          </div>
          
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Territorio</h4>
            <p className="text-sm text-blue-700">
              La zona del lago di Como era caratterizzata da piccoli borghi e un'economia agricola.
            </p>
          </div>

          {context && (
            <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
              <h4 className="font-semibold text-purple-800 mb-2">Approfondimento</h4>
              <p className="text-sm text-purple-700">{context}</p>
            </div>
          )}
        </div>

        <div className="bg-gray-100 rounded-lg p-4 text-center">
          <img 
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
            alt="Mappa storica della Lombardia del XVII secolo" 
            className="w-full h-40 object-cover rounded-lg mb-2" 
          />
          <Button variant="ghost" className="text-literary-blue">
            <i className="fas fa-expand-arrows-alt mr-2"></i>
            Esplora mappa interattiva
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
