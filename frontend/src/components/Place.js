
function Place({place}) {

  const displayContacts = () => {
    let placeContacts = []
    if(place.contacts) {
      placeContacts = place.contacts
      if(placeContacts.some((contact) => contact.contact_type === 'phone' && contact.preferred === true ))
        placeContacts.filter((contact) => contact.contact_type === 'phone' && contact.preferred === true)
      else 
        placeContacts.filter((contact) => contact.contact_type === 'phone')
    }
    return (
      <div>
        {placeContacts && placeContacts.map((contact) => (
          <div key={'pn_' + contact.id}>{contact.phone_number}</div>
        ))}
      </div>
    )
  }

  const displayWebsite = () => {
    let placeContacts = []
    if(place.contacts) {
      placeContacts = place.contacts
      placeContacts.filter((contact) => contact.contact_type === 'url')
    }
    return (
      <div>
        {placeContacts && placeContacts.map((contact) => (
          <div key={'url_' + contact.id}>{contact.url}</div>
        ))}
      </div>
    )
  }

  const displayOpeningHours = () => {
    let schedule = (place.opening_hours && place.opening_hours.days ? place.opening_hours.days : [])
    let holidays = 
      ( place.opening_hours && place.opening_hours.closed_on_holidays ? 
        place.opening_hours.closed_on_holidays : '')

    function capitalizeWord(word) {
      let tempWord = word.toString()
      tempWord = (tempWord.charAt(0).toUpperCase() + tempWord.slice(1))
      return tempWord
    }

    return (
      <div key={'oh_'+place.id}>
        {Object.keys(schedule).map((day, i) => (
          <div key={'sd_'+place.id+'_'+i}>
            <div key={'sdd_'+place.id+'_'+i} className="weekDay">{capitalizeWord(day)}</div>
            <div>
              {schedule[day].filter((item) => (item.type === 'OPEN')).map((val, i) => (
                <div key={'sp_'+place.id+'_'+i}>
                  {val.start + ' - ' + val.end}
                </div>
              ))}
            </div>
          </div>
        ))}
        {holidays !== '' ? 
          <div className="holidays">
            {holidays ? "Closed on holidays" : ''}
          </div> : ''
        }
      </div>
    )
  }

  return (
    <div className="place">
      <div className="placeTitle">{place.displayed_what ? place.displayed_what : ''}</div>
      <div className="placeAddress">
        <div className="pHeader">Address</div>
        <div className="pText">{place.displayed_where ? place.displayed_where : ''}</div>
      </div>
      <div className="placeContacts">
        <div className="pHeader">Contact</div>
        <div className="pText">
          {displayContacts()}
        </div>
      </div>
      
      <div className="placeContacts">
        <div className="pHeader">Website</div>
        <div className="pText">
          {displayWebsite()}
        </div>
      </div>

      <div className="placeContacts">
        <div className="pHeader">Opening hours</div>
        <div className="pText">
          {displayOpeningHours()}
        </div>
      </div>

    </div>
  );
}

export default Place;
