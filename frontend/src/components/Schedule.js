
function Schedule({opening_hours, id}) {

  function compareTimes(left, right) {
    if(left.length === right.length) {
      for(let i = 0; i < left.length; i++) {
        if(left[i].start !== right[i].start)
          return false
      }
      return true
    }
  }

  function returnTimesArray(arr) {
    let newarr = []
    if(arr.length === 0) {
      newarr.push('Closed') 
    } else {
      arr.forEach((element) => {
        newarr.push(element.start + ' - ' + element.end)
      })
    }
    return newarr
  }

  function createGroupedArray(schedule) {

    //create schedule structure and order, empty array means closed implicitly
    let openSchedule = [
      {name:  'Monday',     times:  (schedule.monday    && schedule.monday    ? schedule.monday     : [])},
      {name:  'Tuesday',    times:  (schedule.tuesday   && schedule.tuesday   ? schedule.tuesday    : [])},
      {name:  'Wednesday',  times:  (schedule.wednesday && schedule.wednesday ? schedule.wednesday  : [])},
      {name:  'Thursday',   times:  (schedule.thursday  && schedule.thursday  ? schedule.thursday   : [])},
      {name:  'Friday',     times:  (schedule.friday    && schedule.friday    ? schedule.friday     : [])},
      {name:  'Saturday',   times:  (schedule.saturday  && schedule.saturday  ? schedule.saturday   : [])},
      {name:  'Sunday',     times:  (schedule.sunday    && schedule.sunday    ? schedule.sunday     : [])}
    ]
    
    //group day names by time
    var groupedSchedule = [] 
    let prevElement = {}
    let prevElementIndex = -1
    openSchedule.forEach((element) => {
      if(prevElementIndex === -1) {
        prevElement = element
        prevElementIndex++
        groupedSchedule[prevElementIndex] = {time: returnTimesArray(element.times), names:[]}
        groupedSchedule[prevElementIndex].names.push(element.name)
      }
      else {
        if(compareTimes(prevElement.times,element.times)) {
          groupedSchedule[prevElementIndex].names.push(element.name)
          prevElement = element
        }
        else {
          prevElementIndex++
          groupedSchedule[prevElementIndex] = {time: returnTimesArray(element.times), names:[]}
          groupedSchedule[prevElementIndex].names.push(element.name)
          prevElement = element
        }
      }
    })

    return groupedSchedule

  }

  const displayOpeningHours = () => {

    let holidays = 
      ( opening_hours && opening_hours.closed_on_holidays ? 
        opening_hours.closed_on_holidays : '')

    let schedule = createGroupedArray((opening_hours && opening_hours.days ? opening_hours.days : []))

    return (
      <div key={'schedule_'+id}>
          {schedule.map((element, i) => (
            <div className="schLine" key={'schLine_'+i+'_'+id}>
              <div className="pHeader">
                {
                  element.names.length > 1 ? 
                  (element.names[0] + ' - ' + element.names[element.names.length-1]) :
                  (element.names[0] ? element.names[0] : '')
                }
              </div>
              <div className="pText">
                {element.time.map((timeline, j) => (
                    <div key={'timeline_'+j+'_'+id}>{timeline}</div>
                ))}
              </div>
            </div>
          ))}
          {holidays !== '' ? <div className="holidays">{holidays ? "Closed on holidays" : ''}</div> : ''}
      </div>
    )
  }

  return (
    <div className="schedule">
      {displayOpeningHours()}
    </div>
  );
}

export default Schedule;
