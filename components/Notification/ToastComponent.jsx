import { Text, View } from "react-native";
import { isEmpty } from "../../utils";
import tw from "../../config/tailwind";

function ToastComponent({
  title,
  description,
  textColor,
  titleFontSize,
  descFontSize,
  alignItems,
  type,
}) {
  const returnBgColor = (type) => {
    let clr = "";
    if (type === "error") clr = "bg-red-305";
    if (type === "success") clr = "bg-green2-100";
    if (type === "info") clr = "bg-orange2-100";
    return clr;
  };

  return (
    <View
      style={[
        tw`w-full h-auto px-4 py-3 z-[1000] flex flex-col ${
          alignItems === "center"
            ? "items-center justify-center"
            : "items-start justify-start"
        } ${returnBgColor(type)} `,
        { zIndex: 9999 },
      ]}
    >
      <Text
        style={{
          color: textColor,
          fontSize: titleFontSize ?? 15,
          fontFamily: "ppSB",
        }}
      >
        {title}
      </Text>
      {!isEmpty(description) && (
        <Text
          style={[
            tw`mt-3`,
            {
              color: textColor,
              fontSize: descFontSize,
              fontFamily: "ppReg",
            },
          ]}
        >
          {description}
        </Text>
      )}
    </View>
  );
}
export default ToastComponent;
