import { Box, Typography, Paper } from '@mui/material'

interface InfoPanelProps {
  title: string
  description: string
  position: { x: number; y: number }
  onClose: () => void
}

export const InfoPanel = ({ title, description, position, onClose }: InfoPanelProps) => {
  return (
    <Paper
      elevation={3}
      sx={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        padding: 2,
        maxWidth: 300,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        cursor: 'pointer',
      }}
      onClick={onClose}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2">
        {description}
      </Typography>
    </Paper>
  )
} 