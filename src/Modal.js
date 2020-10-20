import React from "react";
import ReactDom from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

function Modal({ isToggled, setToggled, children }) {
  return ReactDom.createPortal(
    <AnimatePresence exitBeforeEnter>
      {isToggled && (
        <motion.div
          className="modal-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="modal-content"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            exit={{ y: 30 }}
          >
            {children}
            <motion.button
              className="gradient-btn"
              onClick={() => setToggled(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Close <i class="fas fa-times-circle"></i>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("portal")
  );
}

export default Modal;
