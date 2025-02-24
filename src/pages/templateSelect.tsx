import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { templateImagesPaths } from '../Config/constants';
import Header from '../components/Header';
import { useAuth } from '../authProvider';


const TemplateSelect = () => {
    const [isMouseOver, setIsMouseOver] = useState<string | null>(null);
    const { setTemplate } = useAuth();

    return (
        <>
            <div className='mt-5' style={{ minWidth: '300px' }}>
                <div className='justify-content-center mt-5'>
                    <h3 className='pt-1 text-center rounded'>
                        Select a Template to get started!
                    </h3>
                </div>

                <div className='container' style={{ color: '#1f4287' }}>
                    <div className='flex flex-col'>
                        {templateImagesPaths.map((currentTemplate) => (
                            <div className='mt-5' key={currentTemplate.name}>
                                <div
                                    style={{ position: 'relative' }}
                                    onMouseOver={() => setIsMouseOver(currentTemplate.name)}
                                    onMouseOut={() => setIsMouseOver(null)}
                                >
                                    <div className='w-100 d-flex justify-content-center'>
                                        <h3>{currentTemplate.name}</h3>
                                    </div>
                                    <img
                                        className="w-100 image-aspect-ratio"
                                        src={currentTemplate.imageSource}
                                        alt={currentTemplate.name}
                                    />
                                    {isMouseOver === currentTemplate.name && (

                                        <button
                                            className='btn'
                                            style={{ position: 'absolute', top: '50%', right: '30%', background: '#27ae60' }}
                                            onClick={() => 
                                                setTemplate(currentTemplate.name)
                                            }
                                        >
                                            Use Template
                                        </button>

                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default TemplateSelect;
