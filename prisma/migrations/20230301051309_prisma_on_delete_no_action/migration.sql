-- DropForeignKey
ALTER TABLE "Bridge" DROP CONSTRAINT "Bridge_colorId_fkey";

-- DropForeignKey
ALTER TABLE "Bridge" DROP CONSTRAINT "Bridge_gradeId_fkey";

-- DropForeignKey
ALTER TABLE "Bridge" DROP CONSTRAINT "Bridge_lengthId_fkey";

-- DropForeignKey
ALTER TABLE "Bridge" DROP CONSTRAINT "Bridge_operationId_fkey";

-- DropForeignKey
ALTER TABLE "Bridge" DROP CONSTRAINT "Bridge_sizeRangeId_fkey";

-- DropForeignKey
ALTER TABLE "Bridge" DROP CONSTRAINT "Bridge_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Bridge" DROP CONSTRAINT "Bridge_typeId_fkey";

-- DropForeignKey
ALTER TABLE "Bridge" DROP CONSTRAINT "Bridge_workpieceTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Data" DROP CONSTRAINT "Data_channelId_fkey";

-- DropForeignKey
ALTER TABLE "Data" DROP CONSTRAINT "Data_colorId_fkey";

-- DropForeignKey
ALTER TABLE "Data" DROP CONSTRAINT "Data_fractionId_fkey";

-- DropForeignKey
ALTER TABLE "Data" DROP CONSTRAINT "Data_fullModelId_fkey";

-- DropForeignKey
ALTER TABLE "Data" DROP CONSTRAINT "Data_gradeId_fkey";

-- DropForeignKey
ALTER TABLE "Data" DROP CONSTRAINT "Data_lengthId_fkey";

-- DropForeignKey
ALTER TABLE "Data" DROP CONSTRAINT "Data_managerId_fkey";

-- DropForeignKey
ALTER TABLE "Data" DROP CONSTRAINT "Data_materialGroupId_fkey";

-- DropForeignKey
ALTER TABLE "Data" DROP CONSTRAINT "Data_operationId_fkey";

-- DropForeignKey
ALTER TABLE "Data" DROP CONSTRAINT "Data_productionId_fkey";

-- DropForeignKey
ALTER TABLE "Data" DROP CONSTRAINT "Data_recipientId_fkey";

-- DropForeignKey
ALTER TABLE "Data" DROP CONSTRAINT "Data_sizeRangeId_fkey";

-- DropForeignKey
ALTER TABLE "Data" DROP CONSTRAINT "Data_stateId_fkey";

-- DropForeignKey
ALTER TABLE "Data" DROP CONSTRAINT "Data_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Data" DROP CONSTRAINT "Data_typeId_fkey";

-- DropForeignKey
ALTER TABLE "Data" DROP CONSTRAINT "Data_userId_fkey";

-- DropForeignKey
ALTER TABLE "Data" DROP CONSTRAINT "Data_workpieceTypeId_fkey";

-- DropForeignKey
ALTER TABLE "DataProduct" DROP CONSTRAINT "DataProduct_colorId_fkey";

-- DropForeignKey
ALTER TABLE "DataProduct" DROP CONSTRAINT "DataProduct_gradeId_fkey";

-- DropForeignKey
ALTER TABLE "DataProduct" DROP CONSTRAINT "DataProduct_managerId_fkey";

-- DropForeignKey
ALTER TABLE "DataProduct" DROP CONSTRAINT "DataProduct_operationId_fkey";

-- DropForeignKey
ALTER TABLE "DataProduct" DROP CONSTRAINT "DataProduct_recipientId_fkey";

-- DropForeignKey
ALTER TABLE "DataProduct" DROP CONSTRAINT "DataProduct_stateId_fkey";

-- DropForeignKey
ALTER TABLE "DataProduct" DROP CONSTRAINT "DataProduct_storeId_fkey";

-- DropForeignKey
ALTER TABLE "DataProduct" DROP CONSTRAINT "DataProduct_userId_fkey";

-- DropForeignKey
ALTER TABLE "DataProduct" DROP CONSTRAINT "DataProduct_workpieceTypeId_fkey";

-- DropForeignKey
ALTER TABLE "FullModels" DROP CONSTRAINT "FullModels_lengthModelId_fkey";

-- DropForeignKey
ALTER TABLE "FullModels" DROP CONSTRAINT "FullModels_modelId_fkey";

-- DropForeignKey
ALTER TABLE "FullModels" DROP CONSTRAINT "FullModels_profileId_fkey";

-- DropForeignKey
ALTER TABLE "FullModels" DROP CONSTRAINT "FullModels_sizeRangeModelId_fkey";

-- DropForeignKey
ALTER TABLE "FullModels" DROP CONSTRAINT "FullModels_workpieceTypeId_fkey";

-- DropForeignKey
ALTER TABLE "ManagerOperations" DROP CONSTRAINT "ManagerOperations_managerId_fkey";

-- DropForeignKey
ALTER TABLE "ManagerOperations" DROP CONSTRAINT "ManagerOperations_operationId_fkey";

-- DropForeignKey
ALTER TABLE "Managers" DROP CONSTRAINT "Managers_storeId_fkey";

-- DropForeignKey
ALTER TABLE "OperationWorkPieceTypeBridge" DROP CONSTRAINT "OperationWorkPieceTypeBridge_operationsId_fkey";

-- DropForeignKey
ALTER TABLE "OperationWorkPieceTypeBridge" DROP CONSTRAINT "OperationWorkPieceTypeBridge_workpieceTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Productions" DROP CONSTRAINT "Productions_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Recipients" DROP CONSTRAINT "Recipients_storeId_fkey";

-- DropForeignKey
ALTER TABLE "StateOperationBridge" DROP CONSTRAINT "StateOperationBridge_operationId_fkey";

-- DropForeignKey
ALTER TABLE "StateOperationBridge" DROP CONSTRAINT "StateOperationBridge_stateId_fkey";

-- DropForeignKey
ALTER TABLE "StoreOperationsBridge" DROP CONSTRAINT "StoreOperationsBridge_operationId_fkey";

-- DropForeignKey
ALTER TABLE "StoreOperationsBridge" DROP CONSTRAINT "StoreOperationsBridge_storesId_fkey";

-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_storesId_fkey";

-- DropForeignKey
ALTER TABLE "WorkPieceTypeGradeBridge" DROP CONSTRAINT "WorkPieceTypeGradeBridge_gradeId_fkey";

-- DropForeignKey
ALTER TABLE "WorkPieceTypeGradeBridge" DROP CONSTRAINT "WorkPieceTypeGradeBridge_workpieceTypeId_fkey";

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_sizeRangeId_fkey" FOREIGN KEY ("sizeRangeId") REFERENCES "SizeRange"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_materialGroupId_fkey" FOREIGN KEY ("materialGroupId") REFERENCES "MaterialGroup"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_workpieceTypeId_fkey" FOREIGN KEY ("workpieceTypeId") REFERENCES "WorkpieceType"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_operationId_fkey" FOREIGN KEY ("operationId") REFERENCES "Operations"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Stores"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "Grade"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_productionId_fkey" FOREIGN KEY ("productionId") REFERENCES "Productions"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_lengthId_fkey" FOREIGN KEY ("lengthId") REFERENCES "Length"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Managers"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_fractionId_fkey" FOREIGN KEY ("fractionId") REFERENCES "Fraction"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Types"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "Recipients"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_fullModelId_fkey" FOREIGN KEY ("fullModelId") REFERENCES "FullModels"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataProduct" ADD CONSTRAINT "DataProduct_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Stores"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataProduct" ADD CONSTRAINT "DataProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataProduct" ADD CONSTRAINT "DataProduct_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Managers"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataProduct" ADD CONSTRAINT "DataProduct_workpieceTypeId_fkey" FOREIGN KEY ("workpieceTypeId") REFERENCES "ResultsAssemble"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataProduct" ADD CONSTRAINT "DataProduct_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "ColorsAssemble"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataProduct" ADD CONSTRAINT "DataProduct_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "GradesAssemble"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataProduct" ADD CONSTRAINT "DataProduct_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataProduct" ADD CONSTRAINT "DataProduct_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "Recipients"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataProduct" ADD CONSTRAINT "DataProduct_operationId_fkey" FOREIGN KEY ("operationId") REFERENCES "Operations"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bridge" ADD CONSTRAINT "Bridge_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Stores"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bridge" ADD CONSTRAINT "Bridge_operationId_fkey" FOREIGN KEY ("operationId") REFERENCES "Operations"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bridge" ADD CONSTRAINT "Bridge_workpieceTypeId_fkey" FOREIGN KEY ("workpieceTypeId") REFERENCES "WorkpieceType"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bridge" ADD CONSTRAINT "Bridge_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Types"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bridge" ADD CONSTRAINT "Bridge_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "Grade"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bridge" ADD CONSTRAINT "Bridge_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bridge" ADD CONSTRAINT "Bridge_sizeRangeId_fkey" FOREIGN KEY ("sizeRangeId") REFERENCES "SizeRange"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bridge" ADD CONSTRAINT "Bridge_lengthId_fkey" FOREIGN KEY ("lengthId") REFERENCES "Length"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Managers" ADD CONSTRAINT "Managers_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Stores"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManagerOperations" ADD CONSTRAINT "ManagerOperations_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Managers"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManagerOperations" ADD CONSTRAINT "ManagerOperations_operationId_fkey" FOREIGN KEY ("operationId") REFERENCES "Operations"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_storesId_fkey" FOREIGN KEY ("storesId") REFERENCES "Stores"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreOperationsBridge" ADD CONSTRAINT "StoreOperationsBridge_storesId_fkey" FOREIGN KEY ("storesId") REFERENCES "Stores"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreOperationsBridge" ADD CONSTRAINT "StoreOperationsBridge_operationId_fkey" FOREIGN KEY ("operationId") REFERENCES "Operations"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FullModels" ADD CONSTRAINT "FullModels_workpieceTypeId_fkey" FOREIGN KEY ("workpieceTypeId") REFERENCES "WorkpieceType"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FullModels" ADD CONSTRAINT "FullModels_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Models"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FullModels" ADD CONSTRAINT "FullModels_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FullModels" ADD CONSTRAINT "FullModels_sizeRangeModelId_fkey" FOREIGN KEY ("sizeRangeModelId") REFERENCES "SizeRange"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FullModels" ADD CONSTRAINT "FullModels_lengthModelId_fkey" FOREIGN KEY ("lengthModelId") REFERENCES "LengthModel"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationWorkPieceTypeBridge" ADD CONSTRAINT "OperationWorkPieceTypeBridge_workpieceTypeId_fkey" FOREIGN KEY ("workpieceTypeId") REFERENCES "WorkpieceType"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationWorkPieceTypeBridge" ADD CONSTRAINT "OperationWorkPieceTypeBridge_operationsId_fkey" FOREIGN KEY ("operationsId") REFERENCES "Operations"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkPieceTypeGradeBridge" ADD CONSTRAINT "WorkPieceTypeGradeBridge_workpieceTypeId_fkey" FOREIGN KEY ("workpieceTypeId") REFERENCES "WorkpieceType"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkPieceTypeGradeBridge" ADD CONSTRAINT "WorkPieceTypeGradeBridge_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "Grade"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StateOperationBridge" ADD CONSTRAINT "StateOperationBridge_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StateOperationBridge" ADD CONSTRAINT "StateOperationBridge_operationId_fkey" FOREIGN KEY ("operationId") REFERENCES "Operations"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Productions" ADD CONSTRAINT "Productions_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Stores"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipients" ADD CONSTRAINT "Recipients_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Stores"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
