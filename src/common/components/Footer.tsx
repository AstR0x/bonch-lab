import React, { useMemo } from 'react';
import moment from 'moment';

import packageData from '@packageSrc';

export const Footer: React.FC = () => {
  const currentYear = useMemo(() => moment().format('YYYY'), []);

  return (
    <div>
      <main>
        <footer>
          <div>
            <div>8 (800) 100-8-812, бесплатно по РФ</div>
            <div>{`© КОРУС Консалтинг СНГ, 2012 — ${currentYear}`}</div>
            Версия приложения:&nbsp;
            {packageData.version}
          </div>
        </footer>
      </main>
    </div>
  );
};
