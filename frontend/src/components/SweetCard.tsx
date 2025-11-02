import { Card, CardContent, CardMedia, Typography, CardActions, Button } from '@mui/material';
import { Sweet } from '../api';

interface SweetCardProps {
  sweet: Sweet;
  onAddToCart?: (sweet: Sweet) => void;
}

export default function SweetCard({ sweet, onAddToCart }: SweetCardProps) {
  return (
    <Card>
      {sweet.imageUrl && (
        <CardMedia
          component="img"
          height="140"
          image={sweet.imageUrl}
          alt={sweet.name}
        />
      )}
      <CardContent>
        <Typography variant="h6" component="div">
          {sweet.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {sweet.description}
        </Typography>
        <Typography variant="h6" color="primary">
          ₹{sweet.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Available: {sweet.quantity}
        </Typography>
      </CardContent>
      {onAddToCart && (
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => onAddToCart(sweet)}
            disabled={sweet.quantity === 0}
          >
            Add to Cart
          </Button>
        </CardActions>
      )}
    </Card>
  );
}