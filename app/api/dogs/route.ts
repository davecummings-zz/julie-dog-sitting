import { readdirSync } from 'fs'
import { join } from 'path'

export async function GET() {
  try {
    const dogsDir = join(process.cwd(), 'public', 'images', 'dogs')
    const files = readdirSync(dogsDir)
    
    // Filter for image files and sort numerically
    const images = files
      .filter(file => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
      .sort((a, b) => {
        const aNum = parseInt(a.split('.')[0])
        const bNum = parseInt(b.split('.')[0])
        return aNum - bNum
      })
    
    return Response.json({ images, count: images.length })
  } catch (error) {
    console.error('Error reading dogs directory:', error)
    return Response.json({ images: [], count: 0, error: 'Failed to read images' }, { status: 500 })
  }
}
