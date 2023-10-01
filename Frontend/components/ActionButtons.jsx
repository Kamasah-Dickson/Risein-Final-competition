import React, { useState } from 'react';
import { BiRefresh, BiLinkExternal, BiCopy } from 'react-icons/bi';
import { MdMoreVert } from 'react-icons/md';

import { MarketAddress } from '../context/constants';

const ActionButtons = () => {
    const [tooltipText, setTooltipText] = useState('');

    const handleRefresh = () => {
        window.location.reload();
        setTooltipText('Refreshing...');
    };

    const handleExternalLink = () => {
        const nftURL = `https://mumbai.polygonscan.com/token/${MarketAddress}?a=121`;
        window.open(nftURL, '_blank');
        setTooltipText('Redirecting...');
    };

    const handleCopyURL = () => {
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL);
        setTooltipText('URL copied!');
    };

    const handleMouseLeave = () => {
        setTooltipText(''); // Reset the tooltip text when the mouse leaves
    };

    const actionItems = [
        { icon: <BiRefresh onClick={handleRefresh} />, name: "Refresh" },
        { icon: <BiLinkExternal onClick={handleExternalLink} />, name: "External" },
        { icon: <BiCopy onClick={handleCopyURL} />, name: "Copy" },
        { icon: <MdMoreVert />, name: "More" },
    ];

    const iconClassName = 'h-6 w-6 text-gray-500 dark:text-gray-400';

    return (
        <div className='relative flex divide-x divide-gray-300 rounded-lg border border-gray-300 shadow-sm cursor-pointer'>
            {actionItems.map((item) => (
                <div
                    key={item.name}
                    className='action-icon group'
                    onMouseLeave={handleMouseLeave}
                >
                    {React.cloneElement(item.icon, {
                        className: iconClassName,
                        onClick: item.icon.props.onClick,
                    })}
                    <span className='action-tooltip group-hover:scale-100'>
                        {tooltipText || item.name}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default ActionButtons;
