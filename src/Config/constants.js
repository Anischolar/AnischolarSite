import temp1Img from '../assets/img/temp1.png';
import temp2Img from '../assets/img/temp2.png';
import temp3Img from '../assets/img/temp3.png';

export const API_KEY = "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"

export const dummyCV = {
    personalDetails: {
        name: "Nimusiima Vision",
        email: "nimusiima.vision@students.mak.ac.ug",
        phone: "0751214286"
    },
    personalSummary: "A determined Web Developer with a year of experience in web development, primarily focusing on front-end development. Experienced with all stages of the development cycle for dynamic web projects. Strong background in project management and customer relations. Seeking to utilize my skills in a challenging and growth-oriented atmosphere.",
    experience: [
        {
            jobTitle: "Web developer",
            company: "Dowell Research Ltd",
            duration: "2024-10-08 to 2024-10-12",
            duties: [
                "Developed a drag-and-drop web form editor.",
                "Handled both design and coding aspects."
            ] 
        },
        {
            jobTitle: "Intern",
            company: "Outbox",
            duration: "2024-10-06 to 2024-10-07",
            duties: [
                "Contributed to the development of a software tool for aiding gender-based violence victims."
            ]
        }
    ],
    education: [
        {
            degree: "Degree in Land Economics",
            institution: "Makerere University",
            duration: "2024-10-07 to 2024-10-16"
        },
        {
            degree: "UACE",
            institution: "Mbarara High School",
            duration: "2020-02-01 to 2020-12-01" 
        },
        {
            degree: "UCE",
            institution: "Mbarara High School",
            duration: "2018-02-01 to 2018-12-01" 
        }
    ],
    skills: [
        "React - Pro",
        "PHP - Very Good",
        "Tailwind CSS",
        "NodeJS - Very Good",
        "Javascript",
        "Git",
        "MYSQL",
        "MongoDB",
        "Communication",
        "Leadership"
    ], 
    certifications: [
        {
            title: "Web Development",
            link: "https://drive.google.com/file/d/1_lo54zV67ITWYCN7Qw6RMGuaw16FvJrZ/view"
        }
    ]
};

export const templateImagesPaths =[
    {
        name:'Template 1',
        imageSource:temp1Img,
    },
    {
        name:'Template 2',
        imageSource:temp2Img
    },
    {
        name:'Template 3',
        imageSource:temp3Img,
    },
]
