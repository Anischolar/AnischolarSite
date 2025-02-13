import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import Summery from './forms/Summery';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import { Link, Navigate, useParams } from 'react-router-dom';
import ThemeColor from './ThemeColor';
import { Button } from './ui/button';
import Header from '../../../components/Header';
import Certification from './forms/Certification';
import Referees from './forms/Referees';

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);
  const { resumeId } = useParams();
  return (
    <div>
      <div className='pt-24'>
        <div className='flex justify-between items-center'>
          <div className='flex gap-5 bg-slate-50'>
            <ThemeColor />

          </div>
          <div className='flex gap-2'>
            {activeFormIndex > 1
              && <Button size="sm"
                onClick={() => setActiveFormIndex(activeFormIndex - 1)}> <ArrowLeft /> </Button>}
            <Button
              disabled={!enableNext}
              className="flex gap-2 bg-[#27ae60] text-white" size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex + 1)}
            > Next
              <ArrowRight /> </Button>
          </div>
        </div>
        {/* Personal Detail  */}
        {activeFormIndex == 1 ?
          <PersonalDetail enabledNext={(v) => setEnableNext(v)} />
          : activeFormIndex == 2 ?
            <Summery enabledNext={(v) => setEnableNext(v)} />
            : activeFormIndex == 3 ?
              <Experience />
              : activeFormIndex == 4 ?
                <Education />
                : activeFormIndex == 5 ?
                  <Skills />
                  : activeFormIndex == 6 ?
                  <Certification />
                  : activeFormIndex == 7 ?
                  <Referees />
                  : activeFormIndex == 8 ?
                    <Navigate to={'/my-resume/' + resumeId + "/view"} />
                    : null
        }


        {/* Experience  */}

        {/* Educational Detail  */}

        {/* Skills  */}
      </div>
    </div>
  )
}

export default FormSection