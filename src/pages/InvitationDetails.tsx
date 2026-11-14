import portrait from '../assets/couple-save-the-date.jpg';
import { weddingContent } from '../content/weddingContent';
import './invitation-details.css';

const { couple, ceremony, unveiling, rsvp, guestNotes, family, weddingParty } = weddingContent;
const groups = [
  ['Best Men', weddingParty.bestMen],
  ['Maids of Honor', weddingParty.maidsOfHonor],
  ['Groomsmen', weddingParty.groomsmen],
  ['Bridesmaids', weddingParty.bridesmaids],
  ['Flower Ladies', weddingParty.flowerLadies],
] as const;

export function InvitationDetails() {
  return (
    <article className="invitation-details" id="invitation-start" tabIndex={-1} aria-labelledby="wedding-title">
      <header className="invitation-details__opening">
        <p>{unveiling.introduction}</p>
        <h1 id="wedding-title">{couple.first.fullName}<br /><span>&amp;</span><br />{couple.second.fullName}</h1>
        <p><time dateTime={ceremony.dateTime}>{ceremony.displayDate} · {ceremony.displayTime}</time></p>
        <p>{ceremony.venue}<br />{ceremony.location}</p>
        <a href={ceremony.directionsUrl}>Get directions</a>
        <img src={portrait} alt={unveiling.photoDescription} width={1234} height={986} decoding="async" />
      </header>

      <section className="invitation-details__response" id="rsvp" aria-labelledby="respond-title">
        <h2 id="respond-title">An Invitation to Respond</h2>
        <p>Kindly reply by <time dateTime={rsvp.deadline}>{rsvp.displayDeadline}</time>.</p>
        <p>{rsvp.plusOne} We can only accommodate the guests named on your invitation.</p>
        <a className="invitation-details__rsvp" href={rsvp.formUrl}>Open RSVP form</a>
      </section>

      <details>
        <summary>Attire and guest notes</summary>
        <h3>Attire</h3>
        <p>{guestNotes.attire} {guestNotes.colors.join(', ')}. {guestNotes.attireNote}</p>
        <h3>Adults-only celebration</h3><p>{guestNotes.agePolicy}</p>
        <h3>Gifts</h3><p>{guestNotes.gifts}</p>
        <h3>After the reception</h3><p>{guestNotes.afterParty}</p>
      </details>

      <details>
        <summary>Parents and principal sponsors</summary>
        <h3>Parents of the Groom</h3><p>{family.groomParents.join(' & ')}</p>
        <h3>Parents of the Bride</h3><p>{family.brideParents.join(' & ')}</p>
        <h3>Principal Sponsors</h3>
        <ul role="list">{weddingParty.principalSponsors.map(name => <li key={name}>{name}</li>)}</ul>
      </details>

      <details>
        <summary>Wedding entourage</summary>
        {groups.map(([label, names]) => (
          <section key={label}>
            <h3>{label}</h3>
            <ul role="list">{names.map(name => <li key={name}>{name}</li>)}</ul>
          </section>
        ))}
      </details>
    </article>
  );
}
