import couplePortrait from '../../assets/couple-save-the-date.jpg';
import { weddingContent } from '../../content/weddingContent';

export function InvitationCard() {
  const { ceremony, unveiling } = weddingContent;

  return (
    <div className="unveiling__reveal">
      <div className="unveiling__card">
        <div className="unveiling__folio unveiling__folio--sage" aria-hidden="true" />
        <div className="unveiling__folio unveiling__folio--champagne" aria-hidden="true" />
        <div className="unveiling__card-turn">
          <figure className="unveiling__face unveiling__face--front">
            <figcaption>Save the date</figcaption>
            <img
              className="unveiling__portrait"
              src={couplePortrait}
              alt={unveiling.photoDescription}
              width={1234}
              height={986}
              decoding="async"
            />
          </figure>
          <div className="unveiling__face unveiling__face--back">
            <span className="unveiling__card-rule" aria-hidden="true" />
            <h2>The Ceremony</h2>
            <p><time dateTime={ceremony.dateTime}>{ceremony.displayDate} · {ceremony.displayTime}</time></p>
            <p>{ceremony.venue}<br />{ceremony.location}</p>
            <span className="unveiling__card-rule" aria-hidden="true" />
          </div>
        </div>
      </div>
      <p className="unveiling__turn-cue">Keep scrolling for ceremony details</p>
    </div>
  );
}
