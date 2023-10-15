import { useEffect, useState } from "react";
import './timeAgo.less';

const TimeAgo = (props) =>{
    const [showTime,setShowTime]=useState('NAN');
    const [timeago,setTimeago] = useState("NAN");
    useEffect(()=>{
        const showTime = (time)=>{
           let showTime = time.slice(0,-1).split('T')[0]+" "+time.slice(0,-1).split('T')[1].substring(0,8)
            return showTime; // 2017-03-31 16:02:06
        }
        const rtime =(time)=>{

           let new_datetime = time.slice(0,-1).split('T')[0]+" "+time.slice(0,-1).split('T')[1].substring(0,8) // 2017-03-31 08:02:06

           var timestamp = new Date(Date.parse(new_datetime));
            timestamp = timestamp.getTime();
            timestamp = timestamp/1000;
            timestamp = timestamp+8*60*60;
            return timestamp*1000;
            }

        const getDateDiff = (dateTimeStamp) =>{
            //console.log(dateTimeStamp)
            let minute = 1000 * 60;
            let hour = minute * 60;
            let day = hour * 24;
            let halfamonth = day * 15;
            let month = day * 30;
            let year = month * 12;

            let now = new Date().getTime();
            let diffValue = now - dateTimeStamp;

            let yearC = diffValue/year;
            let monthC =diffValue/month;
            let weekC =diffValue/(7*day);
            let halfamonthC = diffValue/halfamonth;
            let dayC =diffValue/day;
            let hourC =diffValue/hour;
            let minC =diffValue/minute;

            let result = '';
            if(yearC >= 1){
                result = parseInt(yearC.toString()) + "年前";
            }else if(monthC >= 1){
                if(halfamonthC===1){
                    result= "半个月前";
                }else{
                    result = parseInt(monthC.toString()) + "个月前";
                }

            }else if(weekC >= 1){
                result = parseInt(weekC.toString()) + "个星期前";
            }else if(dayC >=1){
                result = parseInt(dayC.toString()) +"天前";
            }else if(hourC >=1){
                result = parseInt(hourC.toString()) + "小时前";
            }else if(minC>=1){
                result = parseInt(minC.toString())+"分钟前";
            }else{
                result = "刚刚发表";
            }

            return result;
        }
        //console.log(props)
        if(props.creatTime===undefined){
            setTimeago("NAN")
            setShowTime("NAN")
        }else{
            setTimeago(getDateDiff(rtime(props.creatTime)))
            setShowTime(showTime(props.creatTime))
        }

    })
    return(
        <div className="time-box">
            <div>{showTime}</div>
            <div style={{color:"rgba(var(--semi-blue-5), 1)"}}>({timeago})</div>
        </div>
    )
}
export default TimeAgo;