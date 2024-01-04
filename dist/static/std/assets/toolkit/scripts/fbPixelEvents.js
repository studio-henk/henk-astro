function fbEventPageView(pixelCode) {
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', pixelCode);
    fbq('track', 'PageView');
}

function fbEventViewCategory(catName, catId) {
    fbq('trackCustom', 'ViewCategory', {
      content_name: catName,
      content_category: catName,
      content_category_id: catId,
      content_type: 'product'
    });
}

function fbEventViewProduct(productId, productName, productShortDetails) {
    fbq('track', 'ViewContent', {
      content_ids: [productId],
      content_type: 'product',
      product_name: productName,
      product_description: productShortDetails
    });
}

function fbEventSearch(searchString) {
    fbq('track', 'Search', {
      search_string: searchString,
    });
}

function fbEventAddToCart(ids, amount, currency) {
    fbq('track', 'AddToCart', {
        content_ids: ids,
        content_type: 'product',
        value: amount,
        currency: currency
    });
}

function fbEventPurchase(productDetails, amount, currency) {
    fbq('track', 'Purchase', {
      contents: productDetails,
      content_type: 'product',
      value: amount,
      currency: currency
    });
}