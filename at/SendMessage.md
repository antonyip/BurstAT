# SendMessage
This Smart Contract is activated when it receives one (or more) transactions at some block. Once it receives a transaction, it sends a message to the creator and then refund the sender the ammount he sent (minus activation fee). If more than one transaction is received in same block (from different senders) only one message will be sent to the creator, but all transactions will be refunded in same block (when they are actually processed). If the sender sends n transactions in same block, only one refund will be made with total ammount received (minus n activations fee)

## Smart Contract source code
```
^comment Contract Name: SendMessage
^comment Author: Rui Deleterium
^comment License: GPL-3.0

^declare Str_1
^declare Str_2
^declare AddressLastTx
^declare ValidTransaction
^declare ReceivedAmount
^declare LastTransaction

^comment string "aabbccdd112233"
SET @Str_1 #6464636362626161
SET @Str_2 #0000333332323131

Update:
PCS

^comment Process transaction queue
FUN A_to_Tx_after_Timestamp $LastTransaction
FUN @ValidTransaction check_A_Is_Zero
BZR $ValidTransaction :End
FUN @LastTransaction get_Timestamp_for_Tx_in_A

^comment Proceed only if received is > 0
FUN @ReceivedAmount get_Amount_for_Tx_in_A
BZR $ReceivedAmount :Update
FUN B_to_Address_of_Tx_in_A
FUN @AddressLastTx get_B1

^comment Sends a message to SC Creator
FUN set_A1 $Str_1
FUN set_A2 $Str_2
FUN B_to_Address_of_Creator
FUN send_A_to_Address_in_B

^comment Gives back to sender value received (minus activation fee)
FUN set_B1 $AddressLastTx
FUN send_to_Address_in_B $ReceivedAmount

^comment Check for more transactions
JMP :Update

End:
FIN
```

## Response to AT Creation
```
{
    "transaction": "2373731170702683609",
    "fullHash": "d96d0156ec2ff120c18bc4ce7a0a41f3fdb39dfbc396743511cecdd3499c7321",
    "transactionBytes": "16109984610c1800b3797f6def6a21c97baef646e214dc9eadbdc73a098f9d3ff14b0b32b570322d0000000000000000000000000000000000e1f505000000000000000000000000000000000000000000000000000000000000000000000000df9d15b824d5d94a032781469a820353c938a8cbf311e9ecf79195fdba0dd807f8d8ce6b9f2b3d32a8b796ecd3b5149924b7577f6095299a4a43bc71cfdd1bf800000000a71c04008fc176777575380e010b53656e644d6573736167652f00456e766961206d656e736167656d20616f2063726961646f72207175616e646f206368656761206372c3a96469746f02000000010001000100010080969800000000007501000000006161626263636464010100000031313232333300003033040305000000352501030000001b030000004b35070305000000350603040000001b04000000dd320a03350401020000003310010000000033110101000000320b0332050433160102000000330204040000001a1a0000002800",
    "signatureHash": "ee59593c496d6103f77380fcc69cbbf34d368ba35cd42e4441ac8c6a2fade749",
    "numberPeersSentTo": 0,
    "broadcasted": true,
    "unsignedTransactionBytes": "16109984610c1800b3797f6def6a21c97baef646e214dc9eadbdc73a098f9d3ff14b0b32b570322d0000000000000000000000000000000000e1f5050000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a71c04008fc176777575380e010b53656e644d6573736167652f00456e766961206d656e736167656d20616f2063726961646f72207175616e646f206368656761206372c3a96469746f02000000010001000100010080969800000000007501000000006161626263636464010100000031313232333300003033040305000000352501030000001b030000004b35070305000000350603040000001b04000000dd320a03350401020000003310010000000033110101000000320b0332050433160102000000330204040000001a1a0000002800",
    "transactionJSON": {
        "type": 22,
        "subtype": 0,
        "timestamp": 207717529,
        "deadline": 24,
        "senderPublicKey": "b3797f6def6a21c97baef646e214dc9eadbdc73a098f9d3ff14b0b32b570322d",
        "amountNQT": "0",
        "feeNQT": "100000000",
        "signature": "df9d15b824d5d94a032781469a820353c938a8cbf311e9ecf79195fdba0dd807f8d8ce6b9f2b3d32a8b796ecd3b5149924b7577f6095299a4a43bc71cfdd1bf8",
        "signatureHash": "ee59593c496d6103f77380fcc69cbbf34d368ba35cd42e4441ac8c6a2fade749",
        "fullHash": "d96d0156ec2ff120c18bc4ce7a0a41f3fdb39dfbc396743511cecdd3499c7321",
        "transaction": "2373731170702683609",
        "attachment": {
            "version.AutomatedTransactionsCreation": 1,
            "name": "SendMessage",
            "description": "Envia mensagem ao criador quando chega crédito e devolve o crédito a quem enviou",
            "creationBytes": "02000000010001000100010080969800000000007501000000006161626263636464010100000031313232333300003033040305000000352501030000001b030000004b35070305000000350603040000001b04000000dd320a03350401020000003310010000000033110101000000320b0332050433160102000000330204040000001a1a0000002800"
        },
        "sender": "14763421407851334039",
        "senderRS": "BURST-2LER-KMQ8-88WQ-EPKST",
        "height": 2147483647,
        "version": 1,
        "ecBlockId": "1024698062602682767",
        "ecBlockHeight": 269479
    },
    "requestProcessingTime": 3
}
```
