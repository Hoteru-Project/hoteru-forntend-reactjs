import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {useTranslation} from "react-i18next";



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
  const {t} = useTranslation();
  const sortingIDs = [
    {
      value: '3',
      label: t('our_recommendation'),
    },
    {
      value: '1',
      label: t('pricing'),
    },
    {
      value: '2',
      label: t('reviews_rating'),
    },
  ];

  const handleChange = (requestedSort) => {
    props.mainMenuGetSortId(requestedSort.target.value);
  };
  
  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit="{onTrigger}">
      <div>
        <TextField
          id={sortingIDs.value}
          helperText="Get more insights by sorting our hotels"
          select
          label={t('sort_hotels_by')}
          value={sortingIDs.value}
          onChange={handleChange}
          SelectProps={{
            native: true,
          }}
          >
          {sortingIDs.map((option) => (
            <option
              key={option.value}
              value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
      </div>
    </form>
  );
}