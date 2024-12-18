'use client';

import dayjs from 'dayjs';
import Image from 'next/image';

import { styled } from '@mui/material';
import { useCallback, useState } from 'react';

import IconDelete from '@mui/icons-material/Delete';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Modal from '@mui/material/Modal';

import { getPhotoUrl } from '@/lib/utils';

import DeletePhotoDialog from './DeletePhotoDialog';

type PhotoData = {
  id: string;
  user: {
    name: string;
  };
  patientId: string;
  contentType: string;
  createdAt: Date;
};

const ImageThumbnail = styled(Image)({
  objectFit: 'contain',
  width: '100%',
  height: 'auto',
});

const ImagePreview = styled('img')({
  maxHeight: '90%',
  maxWidth: '90%',
  outline: 'none',
});

type ScanListProps = {
  patientId: string;
  photos: PhotoData[];
  deletePhotoAction: (id: string, patientId: string) => Promise<string>;
};

export default function ScanList({ patientId, photos, deletePhotoAction }: ScanListProps) {
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState<PhotoData>();

  const handleOpen = useCallback((photo: PhotoData) => {
    setPhoto(photo);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <>
      <DeletePhotoDialog patientId={patientId} deletePhotoAction={deletePhotoAction}>
        {(deletePhoto) => (
          <ImageList cols={3}>
            {photos.map((photo) => {
              const src = getPhotoUrl(photo);

              return (
                <ImageListItem
                  key={src}
                  onClick={() => handleOpen(photo)}
                  sx={{
                    '&:hover': {
                      cursor: 'pointer',
                      opacity: 0.7,
                    },
                    transition: 'opacity 0.3s',
                    opacity: 1,
                  }}
                >
                  <ImageThumbnail
                    src={src}
                    alt={photo.contentType}
                    width={300}
                    height={300}
                    priority
                  />
                  <ImageListItemBar
                    position="bottom"
                    title={`Врач: ${photo.user.name}`}
                    subtitle={dayjs(photo.createdAt).format('lll')}
                    actionIcon={
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();

                          deletePhoto(photo.id);
                        }}
                      >
                        <IconDelete />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              );
            })}
          </ImageList>
        )}
      </DeletePhotoDialog>
      {photo && (
        <Modal
          open={open}
          onClose={handleClose}
          // slots={{
          //   backdrop: Backdrop,
          // }}
          // slotProps={{
          //   backdrop: {
          //     timeout: 500,
          //   },
          // }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Fade in={open} timeout={500}>
            <ImagePreview src={getPhotoUrl(photo)} alt={photo.contentType} />
          </Fade>
        </Modal>
      )}
    </>
  );
}
