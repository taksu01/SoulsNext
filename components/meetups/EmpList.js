import MeetupItem from "./EmpItem";
import classes from "./EmpList.module.css";

function MeetupList(props) {
  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup) => (
        <MeetupItem
          key={meetup.id}
          id={meetup.id}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
          details={meetup.details}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
