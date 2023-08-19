'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  HomeIcon,
  NewspaperIcon,
  CameraIcon,
  PhotoIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useSnapshot } from 'valtio';
import { KryButton } from '@skryp/core';

import { authProxyState } from '@/store/auth.state';

import { SidebarProps } from './model';
import { styles } from './styles';

import spacekrypton from '@/assets/svgs/spacekrypton.svg';
import dog from '@/assets/images/dog.jpg';

export const Sidebar = ({ open }: SidebarProps) => {
  const { user } = useSnapshot(authProxyState);
  const pathname = usePathname();

  const style = styles({ open, active: true });

  const icon = {
    width: 23,
    height: 23,
  };

  const items = [
    {
      title: 'Space',
      path: '/app/space',
      icon: <HomeIcon {...icon} />,
    },
    {
      title: 'News',
      path: '/app/news',
      icon: <NewspaperIcon {...icon} />,
    },
    {
      title: 'Photos',
      path: '/app/photos',
      icon: <PhotoIcon {...icon} />,
    },
    {
      title: 'Gallery',
      path: '/app/gallery',
      icon: <CameraIcon {...icon} />,
    },
  ];

  return (
    <motion.div className={style.base()}>
      <Link href="/app/space">
        <Image src={spacekrypton} width={70} height={70} alt="Space Krypton" />
      </Link>

      <div className={style.items()}>
        {items.map(({ path, icon, title }) => (
          <Link
            key={path}
            href={path}
            className={styles({ active: path == pathname, open }).item()}
          >
            {icon}

            {title}
          </Link>
        ))}
      </div>

      {user ? (
        <div className={style.account()}>
          <img
            className={style.avatar()}
            src={user.avatar || dog.src}
            alt={user.username}
          />

          <div className={style.user()}>{user.username}</div>
        </div>
      ) : (
        <div className={style.login()}>
          <Link href="/auth/signin">
            <KryButton variant="solid" block>
              Sign In
            </KryButton>
          </Link>

          <Link href="/auth/signup">
            <KryButton variant="outline" block>
              Sign Up
            </KryButton>
          </Link>
        </div>
      )}
    </motion.div>
  );
};
