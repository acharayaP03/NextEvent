import CustomButton from '../UI/customButton';
import classes from './results-title.module.css';

function ResultsTitle(props) {
  const { date } = props;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className={classes.title}>
      <h1>Events in {humanReadableDate}</h1>
      <CustomButton link='/events'>Show all events</CustomButton>
    </section>
  );
}

export default ResultsTitle;
