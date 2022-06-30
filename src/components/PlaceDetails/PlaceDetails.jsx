import React from 'react'
import { Box, Typography, Card, CardMedia, CardContent, Chip } from '@material-ui/core';
import { LocationOnRounded, Phone } from '@material-ui/icons';
import Rating from '@material-ui/lab/Rating'
import useStyles from './style'
const PlaceDetails = ({ place }) => {

  const classes = useStyles();
  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant='h5'>{place.name}</Typography>
        <Box display="flex" justifyContent="space-between">
          <Rating value={Number(place.rating)} readOnly />
          <Typography gutterBottom variant='subtitle1'>out of {place.num_reviews} reviews</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant='subtitle1'>Prices</Typography>
          <Typography gutterBottom variant='subtitle1'>{place.price_level}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant='subtitle1'>Ranking</Typography>
          <Typography gutterBottom variant='subtitle1'>{place.ranking}</Typography>
        </Box>
        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className={classes.chip} />

        ))}
        {place?.address && (
          <Typography
            gutterBottom
            variant='subtitle2'
            color='textSecondary'
            className={classes.subtitle}
          >
            <LocationOnRounded />{place.address}
          </Typography>
        )}
        {place?.phone && (
          <Typography
            gutterBottom
            variant='subtitle2'
            color='textSecondary'
            className={classes.spacing}
          >
            <Phone />{place.phone}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default PlaceDetails