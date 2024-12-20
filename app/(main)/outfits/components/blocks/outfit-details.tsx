'use client'

import Image from 'next/image'
import { Pencil, Trash2, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

interface Outfit {
  id: number
  picture?: string | null
  occasion: string
  timesWorn: number
  lastWorn?: Date | null
  isAvailable: boolean
  isUsed: boolean
  preview: (string | null)[]
}

interface OutfitDetailsProps {
  outfit: Outfit
  similarOutfits?: Outfit[]
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function OutfitDetails({
  outfit,
  similarOutfits = [],
  onEdit,
  onDelete,
  open,
  onOpenChange
}: OutfitDetailsProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Outfit {outfit.id}</DialogTitle>
          <Button
            className="absolute right-4 top-4"
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        <div className="grid grid-cols-[1fr_2fr] gap-4">
          <div>
            {outfit.picture ? (
              <Image
                src={outfit.picture}
                alt={`Outfit ${outfit.id}`}
                width={150}
                height={150}
                className="rounded-md object-cover"
              />
            ) : (
              <div className="flex h-[150px] w-[150px] items-center justify-center rounded-md bg-muted">
                <span className="text-muted-foreground">No Image</span>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <p>
              <strong>Occasion:</strong> {outfit.occasion}
            </p>
            {outfit.isUsed ? (
              <p>
                <strong>Used:</strong> Yes
              </p>
            ) : (
              <p>
                <strong>Times Worn:</strong> {outfit.timesWorn}
              </p>
            )}
            <p>
              <strong>Last Worn:</strong>{' '}
              {outfit.lastWorn
                ? new Date(outfit.lastWorn).toLocaleDateString()
                : 'Never'}
            </p>
            <p>
              <strong>Available:</strong> {outfit.isAvailable ? 'Yes' : 'No'}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="mb-2 font-semibold">Items</h4>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {outfit.preview.map((item, index) => (
              <div key={index} className="flex-shrink-0">
                {item ? (
                  <Image
                    src={item}
                    alt={`Item ${index + 1}`}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-md bg-muted">
                    <span className="text-xs text-muted-foreground">
                      No Image
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {similarOutfits && similarOutfits.length > 0 && (
          <div className="mt-4">
            <h4 className="mb-2 font-semibold">Similar Outfits</h4>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {similarOutfits.map((similarOutfit) => (
                <div key={similarOutfit.id} className="flex-shrink-0">
                  {similarOutfit.picture ? (
                    <Image
                      src={similarOutfit.picture}
                      alt={`Similar Outfit ${similarOutfit.id}`}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-md bg-muted">
                      <span className="text-xs text-muted-foreground">
                        No Image
                      </span>
                    </div>
                  )}
                  <p className="mt-1 text-xs">
                    Worn: {similarOutfit.timesWorn ?? 0}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {(onEdit || onDelete) && (
          <div className="mt-4 flex justify-between">
            {onEdit && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => onEdit(outfit.id)}
              >
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit outfit</span>
              </Button>
            )}
            {onDelete && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => onDelete(outfit.id)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete outfit</span>
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
