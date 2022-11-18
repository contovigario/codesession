import Schedule from "./Schedule"

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
          <div key={'pn_' + contact.id}>{contact.call_link}</div>
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

  const displayRatings = () => {
    if(place.display_average_rating && place.average_rating) {
      return(
        <div>{place.average_rating.toFixed(1)} ★</div>
      )
    }
    else {
      return null
    }
  }

  return (
    <div className="place">
      <div className="placeTitle">
        <div className="pTitle">{place.displayed_what ? place.displayed_what : ''}</div>
        <div className="pStar">{displayRatings()}</div>
      </div>


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
      
      <div className="placeWebsite">
        <div className="pHeader">Website</div>
        <div className="pText">
          {displayWebsite()}
        </div>
      </div>

      <div className="placeSchedule">
        <div className="pHeader">Opening hours</div>
        <Schedule opening_hours={place.opening_hours} id={place.id}></Schedule>
      </div>

    </div>
  );
}

export default Place;
