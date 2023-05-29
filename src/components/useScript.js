import { useEffect } from 'react';

const useScript = url => {
  useEffect(() => {
    $(document).ready(function () {
 
      $('ul.navbar-nav > li')
              .click(function (e) {
          $('ul.navbar-nav > li')
              .removeClass('active');
          $(this).addClass('active');
      });
  });
  }, [url]);
};

export default useScript;