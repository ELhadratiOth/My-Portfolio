/* eslint-disable react-refresh/only-export-components */
import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import { VscGithub } from 'react-icons/vsc';
import { SiCredly } from 'react-icons/si';

export const SocialMedias = [
  {
    id: 1,
    icon: <FaLinkedin />,
    url: 'https://www.linkedin.com/in/othman-el-hadrati-91aa98243/',
  },
  { id: 3, icon: <FaInstagram />, url: 'https://www.instagram.com/otnox_' },
  { id: 4, icon: <VscGithub />, url: 'https://www.github.com/ELhadratiOth' },
  {
    id: 5,
    icon: <SiCredly />,
    url: 'https://www.credly.com/users/othman-elhadrati',
  },
];
export default SocialMedias;
