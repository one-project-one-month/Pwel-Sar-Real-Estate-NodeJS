-- DropForeignKey
ALTER TABLE "property" DROP CONSTRAINT "property_postId_fkey";

-- DropForeignKey
ALTER TABLE "property" DROP CONSTRAINT "property_propertyTypeId_fkey";

-- DropForeignKey
ALTER TABLE "property_photo" DROP CONSTRAINT "property_photo_propertyId_fkey";

-- AddForeignKey
ALTER TABLE "property" ADD CONSTRAINT "property_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property" ADD CONSTRAINT "property_propertyTypeId_fkey" FOREIGN KEY ("propertyTypeId") REFERENCES "property_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_photo" ADD CONSTRAINT "property_photo_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
