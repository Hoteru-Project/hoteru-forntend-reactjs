import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const sortingIDs = [
  {
    value: '3',
    label: 'Our Recommendation',
  },
  {
    value: '1',
    label: 'Pricing',
  },
  {
    value: '2',
    label: 'Rating',
  }
];

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function SortDropDown(props) {
  const classes = useStyles();
  const [sortID, setSortID] = React.useState();

  const handleChange = (event) => {
    setSortID(event.target.value);
    console.log(event.target.value);
    console.log(props.setRequestedSort);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="standard-select-sortID-native"
          helperText="Get more insights by sorting our hotels"
          select
          label="Sort Hotels By"
          value={sortID}
          onChange={handleChange}
          SelectProps={{
            native: true,
          }}
          >
          {sortingIDs.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
      </div>
    </form>
  );
}