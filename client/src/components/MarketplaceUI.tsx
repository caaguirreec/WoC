import { Box, Button, Card, CardContent, CardMedia, Dialog, DialogContent, DialogTitle, Grid, Typography, IconButton } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { useMarketplaceStore } from '../utils/marketplaceStore'

export const MarketplaceUI = () => {
  const { items, isOpen, toggleMarketplace, selectedItem, setSelectedItem, purchaseItem } = useMarketplaceStore()

  return (
    <Dialog 
      open={isOpen} 
      onClose={toggleMarketplace}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Cycling Marketplace</Typography>
          <IconButton onClick={toggleMarketplace}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          {items.map((item) => (
            
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': { transform: 'scale(1.02)' }
                }}
                onClick={() => setSelectedItem(item)}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={item.thumbnail || '/placeholder.png'}
                  alt={item.name}
                />
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography color="text.secondary">
                    ${item.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </Typography>
                </CardContent>
              </Card>
            
          ))}
        </Grid>

        <Dialog 
          open={!!selectedItem} 
          onClose={() => setSelectedItem(null)}
          maxWidth="sm"
          fullWidth
        >
          {selectedItem && (
            <>
              <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">{selectedItem.name}</Typography>
                  <IconButton onClick={() => setSelectedItem(null)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </DialogTitle>
              <DialogContent>
                <Box mb={2}>
                  <img 
                    src={selectedItem.thumbnail || '/placeholder.png'} 
                    alt={selectedItem.name}
                    style={{ width: '100%', height: 'auto' }}
                  />
                </Box>
                <Typography variant="body1" paragraph>
                  {selectedItem.description}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  ${selectedItem.price}
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => {
                    purchaseItem(selectedItem.id)
                    setSelectedItem(null)
                  }}
                >
                  Purchase
                </Button>
              </DialogContent>
            </>
          )}
        </Dialog>
      </DialogContent>
    </Dialog>
  )
} 