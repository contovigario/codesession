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
          <div key={'pn_' + contact.id}>
            <a href={"tel:"+contact.call_link}>{contact.call_link}</a>
          </div>
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
          <div key={'url_' + contact.id}>
            <a href={contact.url} target='_blank'>{contact.url}</a>
          </div>
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

  const displayAddress = () => {

    let gmQuery = place.displayed_where
    gmQuery = gmQuery.replace('.', '').replace(' ', '+')

    if(place.displayed_where) {
      return(
        <div>
          <a href={'http://maps.google.com/?q=' + gmQuery} target='_blank'>
            {place.displayed_where}
          </a>
        </div>
      )
    }
    else
      return null
    
  }

  return (
    <div className="place">

      <div className="placeTitle">
        <div className="pTitle">{place.displayed_what ? place.displayed_what : ''}</div>
        <div className="pStar">{displayRatings()}</div>
      </div>

      <div className="placeAddress">
        <div className="pHeader">Address</div>
        <div className="pText">
          {displayAddress()}
        </div>
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
