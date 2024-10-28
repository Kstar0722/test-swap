import { toast } from 'react-toastify';

import { CopySvg } from '@/svgs';

interface Props {
  message?: string;
  link?: string;
}

export const SuccessDeployedMessage = ({ message, link }: Props) => {
  return (
    <div className="w-full">
      <div className="w-full flex flex-row justify-between">
        <div className="text-blue-400">{message ?? 'Deployed successfully!'}</div>
        <button
          title="Copy link"
          className="text-blue-500"
          onClick={() => {
            navigator.clipboard.writeText(link ?? '');
            toast.info('Link copied!', {
              position: 'bottom-center',
              delay: 200,
              hideProgressBar: true,
            });
          }}
        >
          <CopySvg width={24} height={24} />
        </button>
      </div>
      {link && (
        <div className="w-full flex flex-row">
          <a href={link} target="_blank" className="text-gray-400">
            {link}
          </a>
        </div>
      )}
    </div>
  );
};
