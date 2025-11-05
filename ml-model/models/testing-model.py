import tensorflow as tf
import tensorflow_hub as hub
import numpy as np
import os 
from dotenv import load_dotenv
load_dotenv()

# Dynamic Keras import (same as in training)
version_fn = getattr(tf.keras, "version", None)
if version_fn and version_fn().startswith("3."):
    import tf_keras as keras
else:
    keras = tf.keras

# path to base directory
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# Path to the saved model
model_path = os.path.join(base_dir,os.getenv('MODEL_PATH'))

# Load the model with custom objects to handle hub.KerasLayer
myModel = keras.models.load_model(
    model_path,
    custom_objects={'KerasLayer': hub.KerasLayer}
)
print('Model loaded')

# Class names used in training (set in same order as dataset subfolders)
class_names = np.array([
    'boudha-stupa',
    'no-landmark',
    # ... add other class names when I create them
])

# Load and preprocess test image
img_path = os.path.join(base_dir,os.getenv('TEST_IMAGE_PATH'))
img = tf.io.read_file(img_path)
img = tf.image.decode_jpeg(img, channels=3)  # Decode JPEG to tensor
img = tf.image.resize(img, [224, 224])       # Resize to match training size
img = img / 255.0                            # Normalize to [0, 1] like Rescaling layer
img = tf.expand_dims(img, axis=0)            # Add a batch dimension to the image tensor (shape: [height, width, channels] -> [1, height, width, channels])
# The model expects a batch of images, so this creates a single-item batch for prediction

# Predict
# Run the model to predict the class of the input image
# predictions is a tensor of shape [1, num_classes] containing raw output scores (logits) for each class
predictions = myModel.predict(img)

# Find the index of the class with the highest score in the predictions
# tf.argmax selects the index of the maximum value along the class axis (axis 0 of predictions[0])
# .numpy() converts the TensorFlow tensor to a NumPy integer for indexing class_names
predicted_class_idx = tf.argmax(predictions[0]).numpy()

# Map the predicted class index to the corresponding class name
# class_names is a NumPy array (e.g., ['boudha-stupa', 'no-landmark'])
# The index from argmax corresponds to the position in class_names
predicted_class_name = class_names[predicted_class_idx]

print(f"Predicted class: {predicted_class_name}")