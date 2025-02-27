
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Brain, LoaderCircle } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useAuth } from '../../../../authProvider';
import { AIChatSession } from '../../../../service/AiService';
import ResumeService from '../../../../service/ResumeService';

const prompt = "Job Title: {jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format"
function Summery({ enabledNext }) {
    const { cvContent, setCvContent } = useAuth();
    const { resumeInfo, setResumeInfo } = useState(null);
    const [summery, setSummery] = useState();
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState();
    // useEffect(()=>{
    //     summery&&setResumeInfo({
    //         ...resumeInfo,
    //         summery:summery
    //     })
    // },[summery])
    useEffect(() => {
        summery && setCvContent({
            ...cvContent,
            summery: summery
        })
    }, [summery])

    const parseAndFormatToHTML = (text) => {
        try {
          const jsonObject = JSON.parse(text);
      
          let textArray;
      
          // If the parsed object is already an array, use it directly
          if (Array.isArray(jsonObject)) {
            textArray = jsonObject;
          } else {
            // Extract the first array found inside the object
            textArray = Object.values(jsonObject).find((value) => Array.isArray(value));
          }
      
          if (!Array.isArray(textArray)) {
            throw new Error("No array found in the response.");
          }
      
          // Ensure all items in the array have the correct format
          const isValidArray = textArray.every(
            (item) =>
              typeof item === "object" &&
              item !== null &&
              "summary" in item &&
              "experience_level" in item
          );
      
        //   if (!isValidArray) {
        //     throw new Error("Array items do not match expected format.");
        //   }
          console.log(textArray);
          
          return textArray;
        } catch (error) {
          console.error("Failed to parse text or find a valid array:", error);
          return "Error generating list";
        }
      };
      
      
    const GenerateSummeryFromAI = async () => {
        setLoading(true)
        const PROMPT = prompt.replace('{jobTitle}', cvContent?.personalDetails?.jobTitle);
        console.log(PROMPT);
        const result = await AIChatSession.sendMessage(PROMPT);
        console.log(JSON.parse(result.response.text()))
        const resp = result.response.text()
        const formattedText = parseAndFormatToHTML(resp);
        
        setAiGenerateSummeryList(formattedText);
        setLoading(false);
    }

    const handleSummeryChange = e => {
        setSummery(e.target.value)
        setCvContent({
            ...cvContent,
            summery: summery
        }
        )
    }

    const onSave = (e) => {
        e.preventDefault();

        setLoading(true)
        const data = {
            data: {
                summery: cvContent?.summery
            }
        }
        ResumeService.UpdateResumeDetail(params?.resumeId, data.data).then(resp => {
            console.log(resp);
            enabledNext(true);
            setLoading(false);
            toast.success("Summary updated");
        }, (error) => {
            setLoading(false);
        })
    }
    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Summery</h2>
                <p>Add Summery for your job title</p>

                <form className='mt-7' onSubmit={onSave}>
                    <div className='flex justify-between items-end'>
                        <label>Add Summery</label>
                        <Button variant="outline" onClick={() => GenerateSummeryFromAI()}
                            type="button" size="sm" className="border-primary text-primary flex gap-2">
                            <Brain className='h-4 w-4' />  Generate from AI</Button>
                    </div>
                    <Textarea className="mt-5" required
                        value={summery}
                        defaultValue={summery ? summery : cvContent?.summery}
                        onChange={handleSummeryChange}
                    />
                    <div className='mt-2 flex justify-end'>
                        <Button type="submit"
                            disabled={loading}>
                            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                        </Button>
                    </div>
                </form>
            </div>


            {aiGeneratedSummeryList && <div className='my-5'>
                <h2 className='font-bold text-lg'>Suggestions</h2>
                {aiGeneratedSummeryList?.map((item, index) => (
                    <div key={index}
                        onClick={() => setSummery(item?.summary)}
                        className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
                        <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
                        <p>{item?.summery || item?.summary}</p>
                    </div>
                ))}
            </div>}
          <ToastContainer />
        </div>
    )
}

export default Summery