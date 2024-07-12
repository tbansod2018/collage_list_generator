import "../style/Home.css"
import { college_status, seat_types} from "../rawData"
import { useState,useEffect } from "react"
import './Home.css'
import Select from 'react-select';


const genders = [
    {value:'G',label:"Male"},
    {value:'L',label:"Female"},
    {value:'O',label:"Other"}
]

const categories = [
    {value:'OPEN',label:'OPEN'},
    {value:'OBC',label:'OBC'},
    {value:'SC',label:'SC'},
    {value:'NT1',label:'NT1'},
    {value:'NT2',label:'NT2'},
    {value:'NT3',label:'NT3'},
    {value:'ST',label:'ST'},
    {value:'DEF',label:'DEF'},
    {value:'PWD',label:'PWD'},
    {value:'ORPHAN',label:'ORPHAN'}
]



const Home = () => {

    const [data,setData] = useState(null);

    useEffect(()=>{

        const fetchData = async () =>{
            const response = await fetch('/api/result')
            const json = await response.json();

            if(response.ok){
                setData(json);
            }
        }

        fetchData()

    },[])

    // const [selectedCount, setSelectedCount] = useState(null);

    // const handleCountChange = (event) => {
    //     setSelectedCount(event.target.value);
    // }

    // const [percentage, setPercentage] = useState('');

    const handlePercentile = (e) => {
        const inputValue = e.target.value;
        console.log("input value = ", parseFloat(inputValue));
        // Validate input to allow only numbers and a single dot
        if ( (inputValue === '') || ( parseFloat(inputValue)>=0 && parseFloat(inputValue)<=100)) {
            setPercentile(inputValue);
        }
    };

    const [percentile,setPercentile] = useState(null);
    const [rank,setRank] = useState(null);
    const [gender,setGender] = useState("");
    const [category,setCategory] = useState("");

    const handleSubmit = async (e)=>{
        
        e.preventDefault();
        const coll = {percentile,rank,gender,gender:gender.value,category:category.value};

        const response = await fetch('/api/result', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(coll),
        })
    
        if (response.ok) {
            // Handle success
            const result = await response.json();
            setData(result)
        } else {
            // Handle error
            console.error('Failed to submit form');
        }
        
    }
    

    return(
        <div className="student-form">
            <h3>Enter Student Details</h3>
            
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Percentile:</span>
                    <input 
                    type="text"
                    required
                    onChange ={handlePercentile}         
                    value={percentile}
                    />
                </label>


                <label>
                    <span>Rank:</span>
                    <input 
                    type="number"
                    required
                    onChange ={(e)=>{setRank(e.target.value)}}         
                    value={rank}
                    />
                </label>

                <label>
                    <span>Gender:</span>
                    <Select
                    onChange={(option)=>{console.log(option.label);setGender(option.label)}}
                    options={genders}
                    />
                </label>


                <label>
                    <span>Category:</span>
                    <Select
                    onChange={(option)=>{setCategory(option)}}
                    options={categories}
                    />
                </label>


                <button>Submit</button>

            </form>

            <div>
                {data && data.map((college)=>(
                    <div className="college" key={college._id}>
                        <h4 className="college-name">{college.college_name}</h4>
                        <h4 className="percentile">{college.closing_percentile}</h4>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Home;