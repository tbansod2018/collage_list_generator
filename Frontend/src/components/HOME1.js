import { useState } from "react";
import "../style/Home.css";
import Select from "react-select";
import React from "react";
import { redirect } from "react-router-dom";
import { cities,branches ,universites} from "./Data/Data";
import jsPdf from 'jspdf'
import 'jspdf-autotable';
import { useAuthContext } from "../hooks/useAuthContext";

const genders = [
  { value: "G", label: "Male" },
  { value: "L", label: "Female" },
];

const categories = [
  { value: "OPEN", label: "OPEN" },
  { value: "OBC", label: "OBC" },
  { value: "SC", label: "SC" },
  { value: "NT1", label: "NT1" },
  { value: "NT2", label: "NT2" },
  { value: "NT3", label: "NT3" },
  { value: "ST", label: "ST" },
  { value: "DEF", label: "DEF" },
  { value: "PWD", label: "PWD" },
  { value: "ORPHAN", label: "ORPHAN" }
];

export default function HOME1() {
  const [percentile, setPercentile] = useState(null);
  const [rank, setRank] = useState(null);
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");

  const [collegeData, setCollegeData] = useState(null);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState([
    
  ]);

  const [selectedCount10, setSelectedCount10] = useState("");
  const [selectedCount30, setSelectedCount30] = useState(null);
  const [selectedCount50, setSelectedCount50] = useState(null);
  const [userCount,setUserCount] = useState();

  const [isPending ,setIsPending] = useState(false);


  const {user} = useAuthContext();


  const handleSubmit = async (e) => {
    setIsPending(true);
    e.preventDefault();
    
    if(!user){
      console.log("You Must Be a Logged In");
      return;
    }

    const cities = selectedCities.map(city => city.value);

    const universitiesCities = selectedUniversity.map(city => city.value);




    const allUnivercities = universitiesCities.flatMap(array => array);



    
    console.log(cities)
    console.log(allUnivercities)

    if(selectedCount10 || selectedCount30 || selectedCount50){
      setUserCount("")
    }


    const coll = {
      percentile,
      gender: gender.value,
      category: category.value,
      count: { selectedCount10, selectedCount30, selectedCount50 ,userCount},
      city:cities,
      branch: selectedBranch.map(branch => branch.value),
      college_name:allUnivercities
    };

    
  
    try {
      const response = await fetch("/api/result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(coll),
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setCollegeData(data);
        } else {
          setCollegeData(null);
        }
      } else {
        console.error("Failed to fetch college");
      }
    } catch (err) {
      console.log("Error ", err);
    }
    setIsPending(false);
  };


  const downloadData = (collegeData)=>{
    const doc = new jsPdf()
    const headers = [[
      'Sr.no.',
      'College ID',
      'College Name',
      'Branch',
      'Percentile',
      'Closing Rank',
      'City',
      
    ]]

    const rows = collegeData.map((item, i) => [
      i + 1,
      item.college_id,
      item.college_name,
      item.branch_name,
      item.closing_percentile,
      item.closing_rank,
      item.city.charAt(0).toUpperCase() + item.city.slice(1),
    ]);

    doc.autoTable({head:headers,body:rows})
    doc.save("edu-elite.pdf");
    

  }

  const handlePercentile = (e) => {
    const inputValue = e.target.value;
    console.log("input value = ", parseFloat(inputValue));
    // Validate input to allow only numbers and a single dot
    if (
      inputValue === "" ||
      (parseFloat(inputValue) >= 0 && parseFloat(inputValue) <= 100)
    ) {
      setPercentile(inputValue);
    }
  };

  return (
    <>
    <h3 className="form-heading">Fill the Details</h3>
      <div className="student-form">
        <form className="student-data" onSubmit={handleSubmit}>
          <label className="percentile">
            <p>Percentile<span className="compulsory-feilds">*</span></p>
            <input
              type="text"
              required
              onChange={handlePercentile}
              value={percentile}
            />
          </label>

          <label className="gender">
            <p>Gender<span className="compulsory-feilds">*</span></p>
            <Select
              className="sam"
              onChange={(option) => {
                setGender(option);
              }}
              options={genders}
              defaultValue={gender}
              required
            />
          </label>

          <label className="category">
            <p>Category<span className="compulsory-feilds">*</span></p>
            <Select
              className="sam"
              onChange={(option) => {
                setCategory(option);
              }}
              options={categories}
              required
            />
          </label>

          <label>
            <p>City</p>
            <Select
              onChange={(option) => {
                setSelectedCities(option);
              }}
              options={cities}
              isMulti
              value={selectedCities}
            />
          </label>

          <label>
            <p>Branch</p>
            <Select
              onChange={(option) => {
                setSelectedBranch(option);
              }}
              options={branches}
              isMulti
              value={selectedBranch}
            />
          </label>

          <label>
            <p>University</p>
            <Select
              onChange={(option) => {
                setSelectedUniversity(option);
              }}
              options={universites}
              isMulti
              value={selectedUniversity}
            />
          </label>

          <label className="count">
            <div className="count-child">
              Count
              <label className="counts">
                <input
                  type="radio"
                  value="10"
                  checked={selectedCount10 === "10"}
                  onChange={() => {
                    setSelectedCount10("10");
                    setSelectedCount30("0");
                    setSelectedCount50("0");
                  }}
                />
                10
              </label>
              <label className="counts ">
                <input
                  type="radio"
                  value={selectedCount30}
                  checked={selectedCount30 === "30"}
                  onChange={() => {
                    setSelectedCount10("0");
                    setSelectedCount30("30");
                    setSelectedCount50("0");
                  }}
                />{" "}
                30
              </label>
              <label className="counts">
                <input
                  type="radio"
                  value={selectedCount50}
                  checked={selectedCount50 === "50"}
                  onChange={() => {
                    setSelectedCount10("0");
                    setSelectedCount30("0");
                    setSelectedCount50("50");
                  }}
                />
                50
              </label>
              <input 
              type="number"
              placeholder="count"
              value={userCount}
              min="0"
              onChange={(e)=>{
                setSelectedCount10("0");
                setSelectedCount30("0");
                setSelectedCount50("0");
                setUserCount(e.target.value)
            }}
            
               />
            </div>
          </label>

          {!isPending && <button className="btn">Search</button>}
          {isPending && <button className="btn">Searching..</button>}
        </form>
      </div>

      <div className="college-data">
        {collegeData && (
          <div className="college-table">
            {collegeData.length === 0 && (
              <div className="no-college">

                <h2 className="error">No Result Found</h2>

              </div>
            )}

            {collegeData.length !== 0 && (
              <h2 className="table-heading">Option Form</h2>
            )}
            <table className="college-items">
              {collegeData.length !== 0 && (
                <tr className="table-header">
                  <td>Sr.no.</td>
                  <td>College ID</td>
                  <td>College Name</td>
                  <td>Branch</td>
                  <td>Percentile</td>
                  <td>Closing Rank</td>
                  <td>City</td>
                </tr>
              )}
              {collegeData.map((college, i) => (
                <tr className="college-item" key={i}>
                  <td className="sr-no">{i + 1}</td>
                  <td className="college-id">{college.college_id}</td>
                  <td className="college-name">{college.college_name}</td>
                  <td className="branch-name">{college.branch_name}</td>
                  <td className="closing-percentile">
                    {college.closing_percentile}
                  </td>
                  <td className="closing-rank">{college.closing_rank}</td>
                  <td className="City">{college.city.charAt(0).toUpperCase() + college.city.slice(1)}</td>
                </tr>
              ))}
            </table>
            {collegeData.length !== 0 && (
              <div className="download-btn-parent">
                <button
                  onClick={() => downloadData(collegeData)}
                  className="download-btn"
                >
                  Download
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
