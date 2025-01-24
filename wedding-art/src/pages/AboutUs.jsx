import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gray-100 py-10 px-5" style={{ paddingTop: 'calc(10px + var(--header-height))' }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>

        {/* Reschedule Policy */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Reschedule Policy</h2>
          <p className="text-gray-700">
            Free Reschedule is applicable if you submit the reschedule request at maximum 96 hours (4 days) before your initial photoshoot date.
          </p>
        </div>

        {/* Cancellation Policy */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Cancellation Policy</h2>
          <p className="text-gray-700">
            Free Cancellation is applicable if you submit the cancellation request at maximum 96 hours (4 days) before your initial photoshoot date.
          </p>
        </div>

        {/* Delivery Time */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Get Your Photos in 48 Hours</h2>
          <p className="text-gray-700">
            Your photos will be edited and ready for download through Google Drive within 48 hours of completing the photoshoot.
          </p>
        </div>

        {/* Photographer Fees */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Photographer Transportation and Entrance Fees</h2>
          <p className="text-gray-700">
            Our photographers are local photographers in the city where you will do the photoshoot. Therefore, there are no travel or accommodation expenses. However, if you want your photoshoot to happen in remote places that are more than 1 hour outside of the city center or any places that require a ticket fee, there might be an additional charge.
          </p>
        </div>

        {/* Highlights */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Why Take Photos With Us?</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li className="mb-2"><span className="font-bold">Iconic Shots:</span> Create the perfect pre-wedding shots with expert guidance from our photographers.</li>
            <li className="mb-2"><span className="font-bold">Curated Photographers:</span> Our photographers are not only experts at taking photos, but also directing poses!</li>
            <li className="mb-2"><span className="font-bold">Highest Quality Photos:</span> Get the highest quality photos of your pre-weddings for you to cherish in years to come.</li>
            <li className="mb-2"><span className="font-bold">Fast Delivery:</span> Download your photos directly from Google in just 48 hours after your pre-wedding session!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
