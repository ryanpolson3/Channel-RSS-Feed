<script runat="server" language="javascript">
   Platform.Load("Core", "1.1.1"); {/*Platform Library Version */}
   var mid = Attribute.GetValue('memberid'); {/* BU Identifier */}
   var callID = Platform.Function.GUID(); {/* GUID for unique identifier */}

   {/* Function returns str at correct length */}
   function truncateString(str, num) {
      if (str.length <= num) {
         return str
      }
      return str.slice(0, num)
   }

   {/* Function to Log Audit to RSSFeedAudit DE */}
   function logger(options)
   {
      return Platform.Function.InsertData("ENT.RSSFeedAudit",["CallID","Message","MemberID","Details"],[callID,options.thisMessage,mid,Stringify(options.thisDetail)]);
   }

   {/* Grabs RSSF and MID */}
   var rssfeed = Platform.Function.Lookup('ENT.Weather Content Data - ACTIVE','stationRSS','mid',mid);

   {/* Grabs Header Names & Values */} 
   var headerNames = ["user-agent"];
   var headerValues = ["Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0"];

   {/* Sets RSSFeed */}
   var xml = HTTP.Get(rssfeed, headerNames, headerValues);
   {/* Sets RSSFeed to String */}
   var xml1 = String(xml.Content);
   
   {/* Build DE Object */}
   var api = new Script.Util.WSProxy();
   var updateObject = {
      CustomerKey: 'RSSFeed - Weather',
      Properties: [
         {
            Name: 'mid',
            Value: mid
         },
         {
            Name: 'timeStamp',
            Value: Platform.Function.Now()
         },
         {
            Name: 'RSSFeed',
            Value: xml1
         }
      ]
   };

   var options = {SaveOptions: [{'PropertyName': '*', SaveAction: 'UpdateAdd'}]};

   var res = api.updateItem('DataExtensionObject', updateObject, options);
   logger({thisMessage:"UpdateRSS",thisDetail:{callID:callID,mid:mid,stationRSS:rssfeed,xml:truncateString(xml1, 3800),time:Platform.Function.Now()}});
</script>