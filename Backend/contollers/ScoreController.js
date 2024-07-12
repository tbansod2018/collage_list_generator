const Data = require('../models/ScoreModel')
const { cities, branches,colleges } = require('./Data/rawData')


//post 

const addCollege = async (req, res) => {
    try{
        let {percentile,city,gender,category,count,branch,college_name} = req.body;

        if(branch.length === 0){
            branch = branches.map( (b)=>(
                b.value));
        }

        if(city.length === 0){
            city = cities.map( (b)=>(
                b.value));
        }
        console.log(city)

        let newCategory = category;
        if (category !== 'TFWS' && category!=='EWS')
        {
            newCategory = gender + category;
        }

        
        console.log(typeof(newCategory))
        // console.log("Gender = ", typeof(gender));
        // console.log("Category = ", typeof(category));

        var range = 0;

        
        
        const percentileH = parseInt(percentile) + range;
        const percentileL = parseInt(percentile) - 0.5;
        console.log(percentile)

        

        const count10 = parseInt(count.selectedCount10)
        const count30 = parseInt(count.selectedCount30)
        const count50 = parseInt(count.selectedCount50)
        let userCount = parseInt(count.userCount)

        if((count10 + count30 + count50) !=0){
            userCount=0;
        }

        let newCount = count10 + count30 + count50 + userCount
        
        if (isNaN(newCount))
        {
            newCount = 45;
        }


        if(college_name.length === 0 ){
            college_name = colleges;
        }
        // console.log(college_name)

        // let result = await Data.find(
        //     // {
        //     // $and: [
        //       {
        //         closing_percentile:{ $lte: percentileH},
        //         category: new RegExp(`^${newCategory}`),
        //         branch_name:{$in: branch},
        //         city:{$in:city},
        //         college_name:{$in:college_name}
                
        //         }
              
        //     // ]
        // //   }
        //   )
        //   .sort({closing_percentile: -1})
        //   .limit(newCount);
          
        // console.log(result)
        console.log(branch)
        console.log(category)
        // if(city.length){
        //     // result = result.filter({city:{$in: city}})
        //     console.log(city)
        // }

        // if(branch.length){
        //     result = result.filter({branch_name:{$in: branch}})
        // }
        // console.log(result)
        let result1 = await Data.find({
            // college_id:"6272",
            closing_percentile: { $gte: percentile },
            category: new RegExp(`^${newCategory}`),
            branch_name: { $in: branch },
            city: { $in: city },
            college_name: { $in: college_name }
          })
          .sort({ closing_percentile: 1 }) 
          .exec();
          

          let result2 = await Data.find(
            // {
            // $and: [
              {
                // college_id:"6272",

                closing_percentile:{ $lt: percentile},
                category: new RegExp(`^${newCategory}`),
                branch_name:{$in: branch},
                city:{$in:city},
                college_name:{$in:college_name}
                }
              
            // ]
        //   }
          )
          .sort({closing_percentile: -1});

          let cnt1=result1.length;
          let cnt2=result2.length;
          let req1=newCount/2;
          let req2=newCount/2;
          if(cnt1<(req1)){
            req2=newCount-cnt1;
          }
          else if(req2>(cnt2)){
            req1=newCount-cnt2;
          }
          
          console.log(typeof result1); 
          result1 = result1.slice(0, req1);
          result1.sort((a, b) => b.closing_percentile - a.closing_percentile);
          result2 = result2.slice(0, req2);
          let result = result1.concat(result2);

        res.json(result);
        

    }catch(error){
        console.error('Error handling form submission:', error);
        res.status(500).json({ error: 'Internal Server Error' });

    }
};




module.exports = {

    addCollege
}