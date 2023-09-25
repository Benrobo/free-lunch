import { ComponentType } from "react";
import { Notifier, Easing, NotifierComponents } from "react-native-notifier";
import ToastComponent from "./ToastComponent";

class CustomToast {
  animationDuration;
  hideDuration;
  TC = (title, description) => {
    let T = <ToastComponent title={title} description={description} />;
    return T;
  };
  constructor(animationDuration, hideDuration) {
    this.animationDuration = animationDuration;
    this.hideDuration = hideDuration * 1000;
  }

  success(title, options, alignItems) {
    const T = () => (
      <ToastComponent
        title={title}
        description={options?.description}
        type={"success"}
        textColor="#fff"
        alignItems={alignItems}
      />
    );
    Notifier.showNotification({
      title,
      description: options?.description,
      duration: this.hideDuration,
      showAnimationDuration: this.animationDuration ?? 150,
      Component: T,
      showEasing: Easing.ease,
      onHidden: options?.onHidden,
      onPress: options?.onPress,
      hideOnPress: true,
      componentProps: {
        alertType: "success",
      },
      containerStyle: {
        zIndex: 1000,
      },
    });
  }

  error(title, options, alignItems) {
    const T = () => (
      <ToastComponent
        title={title}
        description={options?.description}
        type={"error"}
        textColor="#fff"
        alignItems={alignItems}
      />
    );

    Notifier.showNotification({
      title,
      description: options?.description,
      duration: this.hideDuration,
      showAnimationDuration: this.animationDuration ?? 150,
      Component: T,
      showEasing: Easing.ease,
      onHidden: options?.onHidden,
      onPress: options?.onPress,
      hideOnPress: true,
      componentProps: {
        alertType: "error",
      },
      containerStyle: {
        zIndex: 1000,
      },
    });
  }

  info(title, options, alignItems) {
    const T = () => (
      <ToastComponent
        title={title}
        description={options?.description}
        type={"info"}
        textColor="#fff"
        alignItems={alignItems}
      />
    );
    Notifier.showNotification({
      title,
      description: options?.description,
      duration: this.hideDuration,
      showAnimationDuration: this.animationDuration ?? 150,
      Component: T,
      showEasing: Easing.ease,
      onHidden: options?.onHidden,
      onPress: options?.onPress,
      hideOnPress: true,
      componentProps: {
        alertType: "info",
      },
      containerStyle: {
        zIndex: 9999,
      },
    });
  }
}

export default CustomToast;
