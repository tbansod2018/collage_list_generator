
export default function CollegeDetails({college}) {
  return (
    <div className="college">
        <h3 className="college-name">{college.college_name}</h3>
        <h4 className="percentile">{college.closing_percentile}</h4>
      
    </div>
  )
}
