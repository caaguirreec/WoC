import { Box3, Vector3, Object3D } from 'three'

export class CollisionSystem {
  private static instance: CollisionSystem
  private collidableObjects: Map<string, Box3> = new Map()

  private constructor() {}

  static getInstance(): CollisionSystem {
    if (!CollisionSystem.instance) {
      CollisionSystem.instance = new CollisionSystem()
    }
    return CollisionSystem.instance
  }

  addCollidableObject(id: string, object: Object3D) {
    const box = new Box3().setFromObject(object)
    this.collidableObjects.set(id, box)
  }

  removeCollidableObject(id: string) {
    this.collidableObjects.delete(id)
  }

  checkCollision(position: Vector3, radius: number): boolean {
    const playerBox = new Box3(
      new Vector3(position.x - radius, position.y - radius, position.z - radius),
      new Vector3(position.x + radius, position.y + radius, position.z + radius)
    )

    for (const box of this.collidableObjects.values()) {
      if (playerBox.intersectsBox(box)) {
        return true
      }
    }

    return false
  }

  updateObjectBounds(id: string, object: Object3D) {
    const box = new Box3().setFromObject(object)
    this.collidableObjects.set(id, box)
  }
} 