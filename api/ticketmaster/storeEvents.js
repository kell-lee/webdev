import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const validateCategoryData = (event) => {
  if (event.classifications && event.classifications[0].segment) {
    return event.classifications[0].segment.name;
  } else {
    return "Unknown";
  }
};

const validateMinPrice = (event) => {
  if (event.priceRanges && event.priceRanges[0].min) {
    return event.priceRanges[0].min;
  } else {
    return 0;
  }
};

const validateMaxPrice = (event) => {
  if (event.priceRanges && event.priceRanges[0].max) {
    return event.priceRanges[0].max;
  } else {
    return 0;
  }
};

const validateImgURL = (event) => {
  if (event.images && event.images[0].url) {
    return event.images[0].url;
  } else {
    return "";
  }
};

const validateDate = (event) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (event.dates.start.dateTime) {
    return new Date(event.dates.start.dateTime);
  } else {
    return yesterday;
  }
};

const validateDescription = (event) => {
  if (event.pleaseNote) {
    return event.pleaseNote;
  } else if (event.info) {
    return event.info;
  } else {
    return "";
  }
};

const storeEvents = async (events) => {
  try {
    await prisma.product.createMany({
      data: events.map((event) => ({
        id: event.id,
        name: event.name,
        category: validateCategoryData(event),
        date: validateDate(event),
        minPrice: validateMinPrice(event),
        maxPrice: validateMaxPrice(event),
        imgURL: validateImgURL(event),
        description: validateDescription(event),
      })),

      skipDuplicates: true,
    });
    console.log("Events stored successfully");
  } catch (error) {
    console.log();
    console.error("Error storing events:", error);
  }
};

export default storeEvents;
