import { motion, AnimatePresence } from 'framer-motion';

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
	<AnimatePresence>
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 15 }}
			transition={{ delay: 0.2 }}>
			{children}
		</motion.div>
	</AnimatePresence>
);

export default PageWrapper;
