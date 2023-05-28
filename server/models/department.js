import mongoose from 'mongoose' ;

const departmentSchema = mongoose.Schema( {
    deptName  : {
        type : String ,
        required : true
    } ,
    tag : String , 
    members : {
        type : Array ,
        default : [] 
    }
}) ;

const Department = mongoose.model('Department' , departmentSchema ) ;

// const Computer = new Department({
//     deptName : 'Computer Engineering Department' ,
//     tag : 'CS' ,
//     members :  [] 
//  })  ; 

// const Electronics = new Department({
//     deptName : 'Electronics and Telecommunication Department' ,
//     tag : 'ENTC' ,
//     members :  [] 
//  })  ;

// const Robotics = new Department({
//     deptName : 'Robotics and Automation Department' ,
//     tag : 'RNA' ,
//     members :  [] 
//  }) ;

// const IT = new Department({
//     deptName : 'Information Technology Department' ,
//     tag : 'IT' ,
//     members :  [] 
//  }) 

// const Civil = new Department({
//     deptName : 'Civil Engineering Department' ,
//     tag : 'CIV' ,
//     members : [] 
// }) ;

// const Mech = new Department({
//     deptName : 'Mechanical Engineering Department' ,
//     tag : 'MECH' ,
//     members : [] 
// }) ;

// const Instru = new Department({
//     deptName : 'Instrumentation and Control Engineering Department' ,
//     tag : 'INST' ,
//     members : [] 
// }) ;

// const depts = [Computer, IT ,Mech ,Civil , Instru ,Electronics ,Robotics] ;

// Department.insertMany(depts) ;

export default Department ; 



