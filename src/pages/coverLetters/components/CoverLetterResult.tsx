
import React, { useState, useRef } from 'react';
import { Button } from "../../../components/industryComponents/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../components/industryComponents/ui/card";
import { Check, Copy, Download, Edit, RefreshCw, Save } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';
import { collection, getDocs, query, updateDoc, where } from '@firebase/firestore';
import { db } from '../../../Config/firebase.config';
import { useAuth } from '../../../authProvider';

interface CoverLetterResultProps {
  content: string;
  onReset: () => void;
}

const CoverLetterResult: React.FC<CoverLetterResultProps> = ({ content, onReset }) => {
  const [copied, setCopied] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    // toast({
    //   title: "Copied!",
    //   description: "Cover letter copied to clipboard"
    // });
    setTimeout(() => setCopied(false), 2000);
  };

  const HandleDownload = () => {
    window.print();
  }

  async function handleSave() {
    setIsLoading(true);
    try {
      const userDataRef = collection(db, "userData");
      const q = query(userDataRef, where("userId", "==", user?.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;

        // Update the document with the new about info
        await updateDoc(docRef, { coverLetter: content });
        setIsLoading(false);
        alert("Saved successfully!");
      } else {
        console.log("No document found with the specified userId.");
      }
    } catch (error) {
      console.log(error);

    }
  }
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "Cover-Letter.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    // toast({
    //   title: "Downloaded!",
    //   description: "Cover letter saved as text file"
    // });
  };

  return (
    <AnimatedTransition show={true} animation="scale" className="w-full max-w-2xl mx-auto">
      <Card className="shadow-lg border border-border/50 overflow-hidden bg-card/50 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
          <CardTitle className="text-2xl font-bold">Your Cover Letter</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div
            ref={textRef}
            contentEditable={isEditing}
            id='print-area'
            className="whitespace-pre-wrap font-serif text-foreground p-6 bg-background/50 rounded-md border border-border/50 max-h-[60vh] overflow-y-auto"
          >
            {content}
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-3 justify-between bg-muted/20 p-6">
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleCopy} variant="outline" className="flex items-center gap-2">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button onClick={handleSave} variant="outline" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              {isLoading? "Saving...": "Save"}
            </Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button onClick={onReset} variant="outline" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Start Over
            </Button>
            <Button onClick={() => setIsEditing(!isEditing)} variant="default" className="flex items-center gap-2 text-white bg-[#27ae60]">
              <Edit className="h-4 w-4" />
              {isEditing ? "Finish Editing" : "Edit"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </AnimatedTransition>
  );
};

export default CoverLetterResult;
